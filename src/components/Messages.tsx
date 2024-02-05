// @ts-nocheck
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
// import {
//   // PaginatedMessages,
//   useCheckIfConversationHasMoreMessagesQuery,
//   useClearUnreadMessagesForConversationMutation,
//   useDeleteMessageMutation,
//   useGetMessagesForConversationQuery,
// } from '../generated/graphql'

import {
  getActiveConversation,
  getActiveConversee,
  setActiveConversationHasMoreMessages,
  setShouldPauseCheckHasMore,
  getShouldPauseCheckHasMore,
  deleteMessageInStore,
} from '../store/chat'

import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser } from '../store/users'
import ReactAudioPlayer from 'react-audio-player'
import InfiniteScroll from 'react-infinite-scroll-component'
import SocketManager from './SocketIo/SocketManager'
import { getIsMobile } from '../store/ui'
import { Message } from '../generated/graphql'
import { getSocketAuthObject } from '../store/sockets'
import withAxios from '../utils/withAxios'
import AppMenuList from './AppComponents/AppMenuList'

const Messages = ({ axios }) => {
  const dispatch = useDispatch()
  const socketAuthObject = useSelector(getSocketAuthObject)
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversation = useSelector(getActiveConversation)
  const activeConversee = useSelector(getActiveConversee)
  const shouldPauseCheckHasMore = useSelector(getShouldPauseCheckHasMore)
  const isMobile = useSelector(getIsMobile)

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

  // const { data } = useGetMessagesForConversationQuery({
  //   variables,
  //   skip: shouldPause,
  //   fetchPolicy: 'network-only',
  // })
  //
  // let { data: hasMoreOnInit } = useCheckIfConversationHasMoreMessagesQuery({
  //   variables: {
  //     conversationUuid: activeConversation.uuid,
  //   },
  //   skip: shouldPauseCheckHasMore,
  //   fetchPolicy: 'network-only',
  // })

  async function handleCheckForHasMoreMessages() {
    console.log('active conversation:', activeConversation)

    const hasMore = await axios.get(
      'api/conversations/' + activeConversation.uuid + '/checkMessages'
    )

    if (hasMore) {
      dispatch(setActiveConversationHasMoreMessages(hasMore.data))
    }
  }

  useEffect(() => {
    if (activeConversation) {
      if (activeConversation.messages.length === 0) {
        handleCheckForHasMoreMessages()
      }
    }

    return () => {
      setShouldCheckHasMorePause(false)
      // setLocalMessages([])
    }
  }, [activeConversation.messages])

  // useEffect(() => {
  //   if (data) {
  //     setShouldCheckHasMorePause(true)
  //     hasMoreOnInit = undefined
  //
  //     // @ts-ignore
  //     setLocalMessages((prevState) => {
  //       return [...prevState, ...data.getMessagesForConversation.messages]
  //     })
  //   }
  //
  //   return () => {
  //     setShouldCheckHasMorePause(false)
  //     setLocalMessages([])
  //   }
  // }, [data])

  // TODO check how to initialize data
  // useEffect(() => {
  //   if (localMessages.length !== 0) {
  //     dispatch(
  //       addMessagesToConversation({
  //         conversationUuid: activeConversation.uuid,
  //         messages: localMessages,
  //         loggedInProfileUuid: loggedInUser.user.profile.uuid,
  //       })
  //     )
  //
  //     dispatch(setShouldPauseCheckHasMore(true))
  //   }
  // }, [localMessages])
  //
  // useEffect(() => {
  //   if (
  //     activeConversation.unreadMessages &&
  //     activeConversation.unreadMessages !== 0 &&
  //     activeConversation.profileThatHasUnreadMessages ===
  //       loggedInUser.user.profile.uuid
  //   ) {
  //     dispatch(clearUnreadMessagesForConversationInStore)
  //   }
  // }, [])

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
    await axios
      .delete('/api/messages/' + item.uuid)
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            deleteMessageInStore({
              uuid: item.uuid,
              content: item.content,
              deleted: true,
              conversationUuid: activeConversation.uuid,
            })
          )

          activeConversation.profiles.map((profile) => {
            if (profile.uuid !== loggedInUser.user.profile.uuid) {
              SocketManager.emit('message-deleted', {
                messageUuid: item.uuid,
                to: profile.uuid,
                toUsername: profile.username,
                fromUsername: loggedInUser.user.profile.username,
                from: loggedInUser.user.profile.uuid,
                conversationUuid: activeConversation.uuid,
              })
            }
          })
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Flex
      id="scrollableDiv"
      overflowY="auto"
      overflowX="hidden"
      flexDirection="column-reverse"
      className="w-full top-0 px-2 md:px-4 relative overflow-x-hidden"
      style={isMobile ? { height: '77.5vh' } : { height: '77.5vh' }}
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
        hasMore={false}
        // hasMore={
        //   !shouldPauseCheckHasMore
        //     ? !!hasMoreOnInit?.checkIfConversationHasMoreMessages
        //     : !!data?.getMessagesForConversation
        //     ? !!data?.getMessagesForConversation.hasMore
        //     : true
        // }
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
                        className="relative justify-between"
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
                            <AppMenuList
                              bg="black"
                              className="bg-red-500 text-black"
                              border="none"
                              borderRadius="0"
                            >
                              <MenuItem
                                size="xs"
                                bg="black"
                                className="bg-red-500 text-black text-sm"
                                border="none"
                                onClick={async () => {
                                  await deleteMessageHandler(item)
                                }}
                              >
                                Delete message
                              </MenuItem>
                            </AppMenuList>
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
                        bg={!item.deleted ? '' : 'black'}
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

export default withAxios(Messages)
