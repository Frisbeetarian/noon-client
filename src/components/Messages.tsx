import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Flex,
  Text,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  // PaginatedMessages,
  useCheckIfConversationHasMoreMessagesQuery,
  useClearUnreadMessagesForConversationMutation,
  useDeleteMessageMutation,
  useGetMessagesForConversationQuery,
} from '../generated/graphql'

import {
  clearUnreadMessagesForConversationInStore,
  getActiveConversation,
  getActiveConversee,
  addMessagesToConversation,
  setActiveConversationHasMoreMessages,
  setShouldPauseCheckHasMore,
  getShouldPauseCheckHasMore,
  deleteMessageInStore,
} from '../store/chat'

import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser } from '../store/users'
import ReactAudioPlayer from 'react-audio-player'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getSocket } from '../store/sockets'
import { Message } from '../../gql-types'
import { getIsMobile } from '../store/ui'

const Messages = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversation = useSelector(getActiveConversation)
  const activeConversee = useSelector(getActiveConversee)
  const shouldPauseCheckHasMore = useSelector(getShouldPauseCheckHasMore)
  const socket = useSelector(getSocket)
  const isMobile = useSelector(getIsMobile)

  const [
    clearUnreadMessagesForConversation,
    // { loading: unreadMessagesLoading },
  ] = useClearUnreadMessagesForConversationMutation()

  const [
    deleteMessage,
    // { loading: deleteMessageLoading }
  ] = useDeleteMessageMutation()

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
  const [, setShouldCheckHasMorePause] = useState(false)
  const [localMessages, setLocalMessages] = useState<Message[]>([])

  /*  const { data, loading } = useMeQuery({
    pause: isServer(),
    fetchPolicy: 'network-only',
  })*/

  const { data } = useGetMessagesForConversationQuery({
    variables,
    skip: shouldPause,
    fetchPolicy: 'network-only',
  })

  let { data: hasMoreOnInit } = useCheckIfConversationHasMoreMessagesQuery({
    variables: {
      conversationUuid: activeConversation.uuid,
    },
    skip: shouldPauseCheckHasMore,
    fetchPolicy: 'network-only',
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
      console.log(
        'ENTERED DATA:',
        data?.getMessagesForConversation?.messages[0]
      )

      console.log('ENTERED DATA')
      setShouldCheckHasMorePause(true)
      hasMoreOnInit = undefined

      // @ts-ignore
      setLocalMessages((prevState) => {
        return [...prevState, ...data.getMessagesForConversation.messages]
      })

      // data.getMessagesForConversation.messages.map((message) => {
      //
      // })

      // updateMyArray( arr => [...arr, `${arr.length}`]);
    }

    return () => {
      setShouldCheckHasMorePause(false)
      setLocalMessages([])
    }
  }, [data])

  // TODO check how to initialize data
  useEffect(() => {
    console.log('LOCAL MESSAGES:', localMessages)

    if (localMessages.length !== 0) {
      dispatch(
        addMessagesToConversation({
          conversationUuid: activeConversation.uuid,
          messages: localMessages,
          loggedInUser,
        })
      )

      dispatch(setShouldPauseCheckHasMore(true))
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
        variables: {
          conversationUuid: activeConversation.uuid,
          profileUuid: 'fejfnewjnfewjf',
        },
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
    }, 750)
  }

  const deleteMessageHandler = async (item) => {
    const message = await deleteMessage({
      variables: {
        messageUuid: item.uuid,
        conversationUuid: activeConversation.uuid,
        from: loggedInUser.user.profile.uuid,
        type: item.type,
        src: item.src,
      },
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

    activeConversation.profiles.map((profile) => {
      if (profile.uuid !== loggedInUser.user?.profile?.uuid) {
        socket.emit('message-deleted', {
          messageUuid: item.uuid,
          to: profile.uuid,
          toUsername: profile.username,
          fromUsername: loggedInUser.user?.profile?.username,
          from: loggedInUser.user.profile.uuid,
          conversationUuid: activeConversation.uuid,
        })
      }
    })
  }

  return (
    <Flex
      id="scrollableDiv"
      overflowY="auto"
      overflowX="hidden"
      flexDirection="column-reverse"
      className="w-full top-0 py-3 px-2 md:px-4 relative overflow-x-hidden"
      style={isMobile ? { height: '80vh' } : { height: '80vh' }}
    >
      <InfiniteScroll
        dataLength={activeConversation.messages}
        next={fetchMoreMessage}
        style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          overflowX: 'hidden',
        }}
        inverse={true}
        hasMore={
          !shouldPauseCheckHasMore
            ? !!hasMoreOnInit?.checkIfConversationHasMoreMessages
            : !!data?.getMessagesForConversation
            ? !!data?.getMessagesForConversation.hasMore
            : true
        }
        loader={
          <h4 className="m-auto text-xl py-5 top-0 left-1/2">Loading...</h4>
        }
        scrollableTarget="scrollableDiv"
      >
        {activeConversation && activeConversation.type === 'pm'
          ? activeConversation.messages.map((item, index) => {
              if (item.from === 'me') {
                return (
                  <Flex key={index} className=" justify-end">
                    {item.type === 'text' ? (
                      <Flex
                        bg="black"
                        color="white"
                        minW="100px"
                        maxW="350px"
                        my="1"
                        pr={!item.deleted ? '0' : '3'}
                        pl="3"
                        py="2"
                        className="relative justify-between   "
                      >
                        <Text className="">
                          {!item.deleted ? (
                            item.content
                          ) : (
                            <i className="text-gray-400">{item.content}</i>
                          )}
                        </Text>

                        {!item.deleted ? (
                          <Menu>
                            <MenuButton
                              className="-mt-3"
                              as={IconButton}
                              aria-label="Options"
                              icon={<ChevronDownIcon />}
                              variant="none"
                            />

                            {/*<Portal>*/}
                            <MenuList>
                              <MenuItem
                                className="text-red-500 bg-gray-500"
                                onClick={async () => {
                                  await deleteMessageHandler(item)
                                }}
                              >
                                Unsend message
                              </MenuItem>
                            </MenuList>
                            {/*</Portal>*/}
                          </Menu>
                        ) : null}
                      </Flex>
                    ) : item.type === 'image' ? (
                      <Flex
                        className="relative"
                        boxSize={!item.deleted ? 'sm' : ''}
                        bg={!item.deleted ? '' : 'black'}
                        minW={!item.deleted ? '100px' : ''}
                        maxW={!item.deleted ? '350px' : ''}
                        my="1"
                        p={!item.deleted ? '0' : '3'}
                      >
                        {!item.deleted ? (
                          <Flex className="justify-end">
                            <Image
                              boxSize="cover"
                              src={item.src}
                              alt={item.content}
                            />
                          </Flex>
                        ) : (
                          <Text>
                            <i>{item.content}</i>
                          </Text>
                        )}

                        {!item.deleted ? (
                          <div className="absolute right-0 rounded border-black z-50">
                            <Menu>
                              <MenuButton
                                className="-mt-3"
                                as={IconButton}
                                aria-label="Options"
                                icon={<ChevronDownIcon />}
                                variant="none"
                              />

                              {/*<Portal>*/}
                              <MenuList maxW="100px">
                                <MenuItem
                                  onClick={async () => {
                                    await deleteMessageHandler(item)
                                  }}
                                >
                                  Unsend message
                                </MenuItem>
                              </MenuList>
                              {/*</Portal>*/}
                            </Menu>
                          </div>
                        ) : null}
                      </Flex>
                    ) : item.type === 'audio' ? (
                      <Flex
                        className="justify-end relative"
                        boxSize={!item.deleted ? '' : ''}
                        bg={!item.deleted ? 'black' : 'black'}
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
                          <Menu>
                            <MenuButton
                              className="-mt-3"
                              as={IconButton}
                              aria-label="Options"
                              icon={<ChevronDownIcon />}
                              variant="none"
                            />

                            {/*<Portal>*/}
                            <MenuList>
                              <MenuItem
                                onClick={async () => {
                                  await deleteMessageHandler(item)
                                }}
                              >
                                Unsend message
                              </MenuItem>
                            </MenuList>
                            {/*</Portal>*/}
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
                        className=" relative"
                        boxSize={!item.deleted ? 'sm' : ''}
                        bg={!item.deleted ? '' : 'black'}
                        minW={!item.deleted ? '100px' : ''}
                        maxW={!item.deleted ? '350px' : ''}
                        my="1"
                        p={!item.deleted ? '0' : '3'}
                      >
                        {!item.deleted ? (
                          <Flex className="justify-start">
                            <Image
                              boxSize="fill"
                              src={item.src}
                              alt={item.content}
                            />
                          </Flex>
                        ) : (
                          <Text>
                            <i>{item.content}</i>
                          </Text>
                        )}
                      </Flex>
                    ) : item.type === 'audio' ? (
                      <Flex
                        className="justify-end relative"
                        boxSize={!item.deleted ? '' : ''}
                        bg={!item.deleted ? 'black' : 'black'}
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
                        <Text>
                          {!item.deleted ? item.content : <i>{item.content}</i>}
                        </Text>

                        {!item.deleted ? (
                          <Menu>
                            <MenuButton
                              className="-mt-3"
                              as={IconButton}
                              aria-label="Options"
                              icon={<ChevronDownIcon />}
                              variant="none"
                            />

                            {/*<Portal>*/}
                            <MenuList>
                              <MenuItem
                                onClick={async () => {
                                  await deleteMessageHandler(item)
                                }}
                              >
                                Unsend message
                              </MenuItem>
                            </MenuList>
                            {/*</Portal>*/}
                          </Menu>
                        ) : null}
                      </Flex>
                    ) : item.type === 'image' ? (
                      <Flex
                        className="justify-end relative"
                        boxSize={!item.deleted ? 'sm' : ''}
                        bg={!item.deleted ? '' : 'black'}
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

                        {!item.deleted ? (
                          <div className="absolute rounded border-black">
                            <Menu>
                              <MenuButton
                                className="-mt-3"
                                as={IconButton}
                                aria-label="Options"
                                icon={<ChevronDownIcon />}
                                variant="none"
                              />

                              {/*<Portal>*/}
                              <MenuList>
                                <MenuItem
                                  onClick={async () => {
                                    deleteMessageHandler(item)
                                  }}
                                >
                                  Unsend message
                                </MenuItem>
                              </MenuList>
                              {/*</Portal>*/}
                            </Menu>
                          </div>
                        ) : null}
                      </Flex>
                    ) : item.type === 'audio' ? (
                      <Flex
                        className="justify-end relative"
                        boxSize={!item.deleted ? 'sm' : ''}
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
                              className="-mt-3"
                              as={IconButton}
                              aria-label="Options"
                              icon={<ChevronDownIcon />}
                              variant="none"
                            />

                            {/*<Portal>*/}
                            <MenuList>
                              <MenuItem
                                onClick={async () => {
                                  deleteMessageHandler(item)
                                }}
                              >
                                Unsend message
                              </MenuItem>
                            </MenuList>
                            {/*</Portal>*/}
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
                      </Flex>
                    ) : item.type === 'image' ? (
                      <Flex
                        className="justify-end relative"
                        boxSize={!item.deleted ? 'sm' : ''}
                        bg={!item.deleted ? 'red' : 'black'}
                        minW={!item.deleted ? '100px' : ''}
                        maxW={!item.deleted ? '350px' : ''}
                        my="1"
                        p={!item.deleted ? '0' : '3'}
                      >
                        {!item.deleted ? (
                          <Flex className="">
                            <Image src={item.src} alt={item.content} />
                          </Flex>
                        ) : (
                          <Text>
                            <i>{item.content}</i>
                          </Text>
                        )}
                      </Flex>
                    ) : item.type === 'audio' ? (
                      <Flex
                        className="justify-end relative"
                        boxSize={!item.deleted ? 'sm' : ''}
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
      </InfiniteScroll>
    </Flex>
  )
}

export default Messages
