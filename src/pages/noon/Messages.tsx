import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Flex,
  Text,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
} from '@chakra-ui/react'

import {
  SettingsIcon,
  HamburgerIcon,
  EditIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons'

import {
  useCheckIfConversationHasMoreMessagesQuery,
  useClearUnreadMessagesForConversationMutation,
  useDeleteMessageMutation,
  useGetMessagesForConversationQuery,
} from '../../generated/graphql'

import {
  clearUnreadMessagesForConversationInStore,
  getActiveConversation,
  getActiveConversee,
  setActiveConversation,
  setActiveConversationSet,
  setActiveConversee,
  addMessagesToConversation,
  setActiveConversationHasMoreMessages,
  setShouldPauseCheckHasMore,
  getShouldPauseCheckHasMore,
  deleteMessageInStore,
} from '../../store/chat'

import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser } from '../../store/users'
import ReactAudioPlayer from 'react-audio-player'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getSocket } from '../../store/sockets'

const Messages = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversation = useSelector(getActiveConversation)
  const activeConversee = useSelector(getActiveConversee)
  const shouldPauseCheckHasMore = useSelector(getShouldPauseCheckHasMore)
  const socket = useSelector(getSocket)

  const [, clearUnreadMessagesForConversation] =
    useClearUnreadMessagesForConversationMutation()

  const [, deleteMessage] = useDeleteMessageMutation()

  const [variables, setVariables] = useState({
    limit: 20,
    cursor:
      activeConversation.messages.length !== 0
        ? activeConversation.messages[activeConversation.messages.length - 1]
            .createdAt
        : null,
    conversationUuid: activeConversation.uuid,
  })

  const [shouldPause, setShouldPause] = useState(true)
  const [shouldCheckHasMorePause, setShouldCheckHasMorePause] = useState(false)
  const [localMessages, setLocalMessages] = useState([])

  let [{ data, error, fetching }] = useGetMessagesForConversationQuery({
    variables,
    pause: shouldPause,
    requestPolicy: 'network-only',
  })

  let [{ data: hasMoreOnInit }] = useCheckIfConversationHasMoreMessagesQuery({
    variables: {
      conversationUuid: activeConversation.uuid,
    },
    pause: shouldPauseCheckHasMore,
    requestPolicy: 'network-only',
  })

  useEffect(() => {
    console.log(
      'hasmore on init:',
      hasMoreOnInit?.checkIfConversationHasMoreMessages
    )

    if (hasMoreOnInit?.checkIfConversationHasMoreMessages) {
      dispatch(
        setActiveConversationHasMoreMessages(
          hasMoreOnInit?.checkIfConversationHasMoreMessages
        )
      )
    }

    return () => {
      setShouldCheckHasMorePause(false)
      setLocalMessages([])
    }
  }, [hasMoreOnInit?.checkIfConversationHasMoreMessages])

  useEffect(() => {
    if (data) {
      setShouldCheckHasMorePause(true)
      dispatch(setShouldPauseCheckHasMore(true))
      hasMoreOnInit = null
      setLocalMessages(data.getMessagesForConversation.messages)
    }

    return () => {
      setShouldCheckHasMorePause(false)
      // dispatch(setShouldPauseCheckHasMore(false))
      setLocalMessages([])
    }
  }, [data])

  // TODO check how to initialize data
  useEffect(() => {
    if (localMessages.length !== 0) {
      dispatch(
        addMessagesToConversation({
          conversationUuid: activeConversation.uuid,
          messages: localMessages,
          loggedInUser,
        })
      )
    } else {
    }
  }, [localMessages])

  useEffect(() => {
    if (
      activeConversation.unreadMessages &&
      activeConversation.unreadMessages !== 0 &&
      activeConversation.profileThatHasUnreadMessages ===
        loggedInUser.user.profile.uuid
    ) {
      clearUnreadMessagesForConversation({
        conversationUuid: activeConversation.uuid,
        profileUuid: 'fejfnewjnfewjf',
      })

      dispatch(clearUnreadMessagesForConversationInStore)
    }

    return () => {
      // dispatch(setActiveConversationSet(false))
      // dispatch(setActiveConversee(null))
      // dispatch(setActiveConversation(null))
      // setVariables({
      //   conversationUuid: null,
      //   limit: variables.limit,
      //   cursor: null,
      // })
    }
  }, [])

  const fetchMoreMessage = () => {
    setTimeout(() => {
      setVariables({
        conversationUuid: activeConversation.uuid,
        limit: variables.limit,
        cursor:
          activeConversation.messages[activeConversation.messages.length - 1]
            .createdAt,
      })

      setShouldPause(false)

      // dispatch(
      //   addMessagesToConversation({
      //     conversationUuid: activeConversation.uuid,
      //     messages: data ? data.getMessagesForConversation.messages : [],
      //     loggedInUser,
      //   })
      // )
    }, 750)
  }

  const deleteMessageHandler = async (item) => {
    const message = await deleteMessage({
      messageUuid: item.uuid,
      conversationUuid: activeConversation.uuid,
      from: loggedInUser.user.profile.uuid,
      type: item.type,
      src: item.src,
    })

    console.log('message in update message1:', message)

    dispatch(
      deleteMessageInStore({
        uuid: message.data?.deleteMessage.uuid,
        content: message.data?.deleteMessage.content,
        deleted: message.data?.deleteMessage.deleted,
        conversationUuid: activeConversation.uuid,
      })
    )

    // socket.emit(
    //   'message-deleted',
    //   ({ session }) => {}
    // )

    activeConversation.profiles.map((profile) => {
      if (profile.uuid !== loggedInUser.user?.profile?.uuid) {
        socket.emit('message-deleted', {
          messageUuid: item.uuid,
          to: profile.uuid,
          toUsername: profile.username,
          fromUsername: loggedInUser.user?.profile?.username,
          from: loggedInUser.user.profile.uuid,
          fromUsername: loggedInUser.user.profile.username,
          conversationUuid: activeConversation.uuid,
        })
      }
    })
  }

  return (
    <Flex
      id="scrollableDiv"
      overflowY="auto"
      flexDirection="column-reverse"
      className="w-full top-0 py-3 px-5 relative"
      style={{ height: '80vh' }}
    >
      {/* <div
        style={{
          height: 600,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
      > */}
      {/*Put the scroll bar always on the bottom*/}
      {/* {data && data.getMessagesForConversation.messages.length !== 0 ? ( */}

      <InfiniteScroll
        dataLength={activeConversation.messages}
        next={fetchMoreMessage}
        style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
        inverse={true}
        hasMore={
          !shouldPauseCheckHasMore
            ? hasMoreOnInit?.checkIfConversationHasMoreMessages
            : data?.getMessagesForConversation
            ? data?.getMessagesForConversation.hasMore
            : true
        }
        loader={
          <h4 className="m-auto text-xl py-5 top-0 left-1/2">Loading...</h4>
        }
        scrollableTarget="scrollableDiv"
      >
        {/* {this.state.items.map((_, index) => (
            <div style={style} key={index}>
              div - #{index}
            </div>
          ))} */}

        {activeConversation && activeConversation.type === 'pm'
          ? activeConversation.messages.map((item, index) => {
              if (item.from === 'me') {
                return (
                  <Flex key={index} w="100%" justify="flex-end">
                    {item.type === 'text' ? (
                      <Flex
                        bg="black"
                        color="white"
                        minW="100px"
                        maxW="350px"
                        my="1"
                        p="3"
                        className="relative"
                      >
                        <Text>
                          {!item.deleted ? item.content : <i>{item.content}</i>}
                        </Text>

                        {/*<Icon></Icon>*/}
                        {/*<ChevronDownIcon className="mx-2 -mr-1 " />*/}

                        {!item.deleted ? (
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              aria-label="Options"
                              icon={<ChevronDownIcon />}
                              variant="none"
                              px={0}
                              py={0}
                              mx={0}
                              my={0}
                            />

                            <MenuList>
                              <MenuItem
                                onClick={async () => {
                                  await deleteMessageHandler(item)
                                }}
                              >
                                Unsend message
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        ) : null}
                      </Flex>
                    ) : item.type === 'image' ? (
                      <Flex
                        className="justify-end relative"
                        boxSize="{!item.deleted ? 'sm' : ''}"
                        bg={!item.deleted ? '' : 'black'}
                        minW={!item.deleted ? '100px' : ''}
                        maxW={!item.deleted ? '350px' : ''}
                        my="1"
                        p={!item.deleted ? '0' : '3'}
                      >
                        {/*<Image src={item.src} alt={item.content} />*/}

                        {!item.deleted ? (
                          <Image src={item.src} alt={item.content} />
                        ) : (
                          <Text>
                            <i>{item.content}</i>
                          </Text>
                        )}

                        {!item.deleted ? (
                          <div className="absolute border rounded border-black">
                            <Menu>
                              <MenuButton
                                as={IconButton}
                                aria-label="Options"
                                icon={<ChevronDownIcon />}
                                variant="none"
                                px={0}
                                py={0}
                                mx={0}
                                my={0}
                              />

                              <MenuList>
                                <MenuItem
                                  onClick={async () => {
                                    await deleteMessageHandler(item)
                                  }}
                                >
                                  Unsend message
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </div>
                        ) : null}
                      </Flex>
                    ) : item.type === 'audio' ? (
                      <Flex
                        className="justify-end relative"
                        boxSize="{!item.deleted ? 'sm' : ''}"
                        bg={!item.deleted ? 'red' : 'black'}
                        minW={!item.deleted ? '100px' : ''}
                        maxW={!item.deleted ? '350px' : ''}
                        my="1"
                        p={!item.deleted ? '0' : '3'}
                      >
                        {!item.deleted ? (
                          <ReactAudioPlayer src={item.src} controls />
                        ) : (
                          <Text>
                            <i>{item.content}</i>
                          </Text>
                        )}
                        {!item.deleted ? (
                          // <div className=" border rounded border-black">
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              aria-label="Options"
                              icon={<ChevronDownIcon />}
                              variant="none"
                              px={0}
                              py={0}
                              mx={0}
                              my={0}
                            />

                            <MenuList>
                              <MenuItem
                                onClick={async () => {
                                  await deleteMessageHandler(item)
                                }}
                              >
                                Unsend message
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        ) : // </div>
                        null}
                      </Flex>
                    ) : null}
                  </Flex>
                )
              } else {
                return (
                  <Flex className="items-start" key={index} w="100%">
                    <Avatar
                      size="sm"
                      name={activeConversee.username}
                      className="mr-2"
                    ></Avatar>
                    {item.type === 'text' ? (
                      <Flex
                        bg="gray.100"
                        color="black"
                        minW="100px"
                        maxW="350px"
                        my="1"
                        p="3"
                      >
                        <Text>
                          {!item.deleted ? item.content : <i>{item.content}</i>}
                        </Text>
                      </Flex>
                    ) : item.type === 'image' ? (
                      <Flex
                        className="justify-start"
                        boxSize="sm"
                        minW="100px"
                        maxW="350px"
                        my="1"
                      >
                        <Image src={item.src} alt={item.content} />
                      </Flex>
                    ) : item.type === 'audio' ? (
                      <Flex
                        className="justify-start"
                        minW="100px"
                        maxW="350px"
                        my="1"
                      >
                        <ReactAudioPlayer src={item.src} controls />
                      </Flex>
                    ) : null}
                  </Flex>
                )
              }
            })
          : activeConversation && activeConversation.type === 'group'
          ? activeConversation.messages.map((item, index) => {
              if (item.from === 'me') {
                return (
                  <Flex key={index} w="100%" justify="flex-end">
                    {item.type === 'text' ? (
                      <Flex
                        bg="black"
                        color="white"
                        minW="100px"
                        maxW="350px"
                        my="1"
                        p="3"
                        className="relative"
                      >
                        {/*<Text>{item.content}</Text>*/}
                        <Text>
                          {!item.deleted ? item.content : <i>{item.content}</i>}
                        </Text>

                        {!item.deleted ? (
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              aria-label="Options"
                              icon={<ChevronDownIcon />}
                              variant="none"
                              px={0}
                              py={0}
                              mx={0}
                              my={0}
                            />

                            <MenuList>
                              <MenuItem
                                onClick={async () => {
                                  await deleteMessageHandler(item)
                                }}
                              >
                                Unsend message
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        ) : null}
                      </Flex>
                    ) : item.type === 'image' ? (
                      <Flex
                        className="justify-end relative"
                        boxSize="{!item.deleted ? 'sm' : ''}"
                        bg={!item.deleted ? 'red' : 'black'}
                        minW={!item.deleted ? '100px' : ''}
                        maxW={!item.deleted ? '350px' : ''}
                        my="1"
                        p={!item.deleted ? '0' : '3'}
                      >
                        {/*<Text>*/}
                        {/*   item.content : <i>{item.content}</i>}*/}
                        {/*</Text>*/}

                        {!item.deleted ? (
                          <Image src={item.src} alt={item.content} />
                        ) : (
                          <Text>
                            <i>{item.content}</i>
                          </Text>
                        )}

                        {!item.deleted ? (
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              aria-label="Options"
                              icon={<ChevronDownIcon />}
                              variant="none"
                              px={0}
                              py={0}
                              mx={0}
                              my={0}
                            />

                            <MenuList>
                              <MenuItem
                                onClick={async () => {
                                  deleteMessageHandler(item)
                                }}
                              >
                                Unsend message
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        ) : null}
                      </Flex>
                    ) : item.type === 'audio' ? (
                      <Flex
                        className="justify-end relative"
                        boxSize="{!item.deleted ? 'sm' : ''}"
                        bg={!item.deleted ? 'red' : 'black'}
                        minW={!item.deleted ? '100px' : ''}
                        maxW={!item.deleted ? '350px' : ''}
                        my="1"
                        p={!item.deleted ? '0' : '3'}
                      >
                        {/*<ReactAudioPlayer src={item.src} controls />*/}

                        {!item.deleted ? (
                          <ReactAudioPlayer src={item.src} controls />
                        ) : (
                          <Text>
                            <i>{item.content}</i>
                          </Text>
                        )}

                        {!item.deleted ? (
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              aria-label="Options"
                              icon={<ChevronDownIcon />}
                              variant="none"
                              px={0}
                              py={0}
                              mx={0}
                              my={0}
                            />
                            <MenuList>
                              <MenuItem
                                onClick={async () => {
                                  deleteMessageHandler(item)
                                }}
                              >
                                Unsend message
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        ) : null}
                      </Flex>
                    ) : null}
                  </Flex>
                )
              } else {
                return (
                  <Flex className="items-start" key={index} w="100%">
                    <Avatar
                      size="sm"
                      name={item.sender.username}
                      className="mr-2"
                    ></Avatar>
                    {item.type === 'text' ? (
                      <Flex
                        bg="gray.100"
                        color="black"
                        minW="100px"
                        maxW="350px"
                        my="1"
                        p="3"
                      >
                        <Text>
                          {!item.deleted ? item.content : <i>{item.content}</i>}
                        </Text>

                        {/*<Text>{item.content}</Text>*/}
                      </Flex>
                    ) : item.type === 'image' ? (
                      <Flex
                        className="justify-end relative"
                        boxSize="{!item.deleted ? 'sm' : ''}"
                        bg={!item.deleted ? 'red' : 'black'}
                        minW={!item.deleted ? '100px' : ''}
                        maxW={!item.deleted ? '350px' : ''}
                        my="1"
                        p={!item.deleted ? '0' : '3'}
                      >
                        {!item.deleted ? (
                          <Image src={item.src} alt={item.content} />
                        ) : (
                          <Text>
                            <i>{item.content}</i>
                          </Text>
                        )}

                        {/*<Image src={item.src} alt={item.content} />*/}
                      </Flex>
                    ) : item.type === 'audio' ? (
                      <Flex
                        className="justify-end relative"
                        boxSize="{!item.deleted ? 'sm' : ''}"
                        bg={!item.deleted ? 'red' : 'black'}
                        minW={!item.deleted ? '100px' : ''}
                        maxW={!item.deleted ? '350px' : ''}
                        my="1"
                        p={!item.deleted ? '0' : '3'}
                      >
                        {!item.deleted ? (
                          <ReactAudioPlayer src={item.src} controls />
                        ) : (
                          <Text>
                            <i>{item.content}</i>
                          </Text>
                        )}
                      </Flex>
                    ) : null}
                  </Flex>
                )
              }
            })
          : null}

        {/* <AlwaysScrollToBottom /> */}
        {/* <Button
          onClick={() => {
            setVariables({
              conversationUuid: activeConversation.uuid,
              limit: variables.limit,
              cursor:
                activeConversation.messages[
                  activeConversation.messages.length - 1
                ].createdAt,
            })

            setShouldPause(false)
          }}
          isLoading={fetching}
        >
          Load more messages
        </Button> */}
      </InfiniteScroll>
      {/* ) : null} */}
      {/* </div> */}
    </Flex>
  )
}

export default Messages
