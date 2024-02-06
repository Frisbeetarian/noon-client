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
  IconButton,
  Spinner,
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'

import {
  getActiveConversation,
  getActiveConversee,
  setActiveConversationHasMoreMessages,
  setShouldPauseCheckHasMore,
  getShouldPauseCheckHasMore,
  deleteMessageInStore,
  addMessagesToConversation,
} from '../store/chat'

import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser } from '../store/users'
import ReactAudioPlayer from 'react-audio-player'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getIsMobile } from '../store/ui'
import withAxios from '../utils/withAxios'
import AppMenuList from './AppComponents/AppMenuList'
import { useGetMessagesForConversationQuery } from '../store/api/conversationsApiSlice'

const Messages = ({ axios }) => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversation = useSelector(getActiveConversation)
  const activeConversee = useSelector(getActiveConversee)
  const shouldPauseCheckHasMore = useSelector(getShouldPauseCheckHasMore)
  const isMobile = useSelector(getIsMobile)
  const [cursor, setCursor] = useState(
    activeConversation.messages.length !== 0
      ? new Date(
          activeConversation.messages[
            activeConversation.messages.length - 1
          ].createdAt
        ).getTime()
      : null
  )

  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [fetchMessages, setFetchMessages] = useState(false)

  const {
    data: messagesResponse,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useGetMessagesForConversationQuery(
    {
      conversationUuid: activeConversation.uuid,
      limit: 10,
      cursor: cursor,
    },
    {
      skip: fetchMessages || !activeConversation?.uuid,
    }
  )

  const loadMoreMessages = () => {
    setFetchMessages(true)

    // console.log('messagesResponse:', messagesResponse)
    if (messagesResponse?.hasMore) {
      setCursor(
        new Date(
          messagesResponse.messages[
            messagesResponse.messages.length - 1
          ].createdAt
        ).getTime()
      )
      dispatch(
        addMessagesToConversation({
          conversationUuid: activeConversation.uuid,
          messages: messagesResponse.messages,
          loggedInProfileUuid: loggedInUser.user.profile.uuid,
        })
      )
      // setHasMore(true)
    } else {
      // setHasMore(false)
    }
  }

  useEffect(() => {
    if (messagesResponse?.hasMore) {
      setHasMore(true)
    } else {
      setHasMore(false)
    }

    if (messagesResponse && messagesResponse?.messages.length !== 0) {
      console.log('messagesResponse:', messagesResponse)
    }
  }, [messagesResponse])

  const handleFetchMoreMessages = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1)
      fetchNextPage()
    }
  }

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

    // return () => {
    //   setShouldCheckHasMorePause(false)
    //   // setLocalMessages([])
    // }
  }, [activeConversation.messages])

  const deleteMessageHandler = async (item) => {
    await axios
      .delete(
        `/api/messages?messageUuid=${item.uuid}&conversationUuid=${activeConversation.uuid}&from=${loggedInUser.user.profile.uuid}&type=${item.type}&src=${item.src}.`,
        {
          conversationUuid: activeConversation.uuid,
          messageUuid: item.uuid,
          from: loggedInUser.user.profile.uuid,
          type: item.type,
          src: item.src,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            deleteMessageInStore({
              uuid: response.data.uuid,
              content: response.data.content,
              deleted: true,
              conversationUuid: activeConversation.uuid,
            })
          )
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  if (isLoading || isFetching) {
    return <Spinner />
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
        dataLength={activeConversation.messages.length}
        next={loadMoreMessages}
        style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          overflowX: 'hidden',
        }}
        inverse={true}
        hasMore={hasMore}
        loader={<Spinner />}
        scrollableTarget="scrollableDiv"
      >
        {activeConversation && activeConversation.type === 'pm'
          ? activeConversation.messages.map((item, index) => {
              if (item.from === 'me') {
                return (
                  <Flex key={index} className="justify-end">
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
                            <i className="text-gray-400">{item.content}</i>
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
                              <AppMenuList
                                maxW="100px"
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
                          // <AppAudioPlayer
                          //   src={item.src}
                          //   onPlay={(e) => console.log('Playing audio')}
                          //   autoPlay={false}
                          // />
                          <ReactAudioPlayer src={item.src} controls />
                        ) : (
                          <Text>
                            <i className="text-gray-400">{item.content}</i>
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

                            <AppMenuList
                              maxW="100px"
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
                          {!item.deleted ? (
                            item.content
                          ) : (
                            <i className="text-gray-400">{item.content}</i>
                          )}
                        </Text>
                      </Flex>
                    ) : item.type === 'image' ? (
                      <Flex
                        className=" relative"
                        boxSize={!item.deleted ? 'sm' : ''}
                        bg={!item.deleted ? '' : 'gray.100'}
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
                            <i className="text-gray-400">{item.content}</i>
                          </Text>
                        )}
                      </Flex>
                    ) : item.type === 'audio' ? (
                      <Flex
                        className="justify-end relative"
                        boxSize={!item.deleted ? '' : ''}
                        bg={!item.deleted ? 'black' : 'gray.100'}
                        minW={!item.deleted ? '100px' : ''}
                        maxW={!item.deleted ? '350px' : ''}
                        my="1"
                        p={!item.deleted ? '0' : '3'}
                      >
                        {!item.deleted ? (
                          <ReactAudioPlayer src={item.src} controls />
                        ) : (
                          <Text>
                            <i className="text-gray-400">{item.content}</i>
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
                        pr={!item.deleted ? '0' : '3'}
                        pl="3"
                        py="2"
                        className="relative justify-between"
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
                            <i className="text-gray-400">{item.content}</i>
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
                              <AppMenuList
                                maxW="100px"
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
                            <i className="text-gray-400">{item.content}</i>
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
                            <AppMenuList
                              maxW="100px"
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
                          {!item.deleted ? (
                            item.content
                          ) : (
                            <i className="text-gray-400">{item.content}</i>
                          )}
                        </Text>
                      </Flex>
                    ) : item.type === 'image' ? (
                      <Flex
                        className="justify-end relative"
                        boxSize={!item.deleted ? 'sm' : ''}
                        bg={!item.deleted ? '' : 'gray.100'}
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
                            <i className="text-gray-400">{item.content}</i>
                          </Text>
                        )}
                      </Flex>
                    ) : item.type === 'audio' ? (
                      <Flex
                        className="justify-end relative"
                        boxSize={!item.deleted ? 'sm' : ''}
                        bg={!item.deleted ? 'red' : 'gray.100'}
                        minW={!item.deleted ? '100px' : ''}
                        maxW={!item.deleted ? '350px' : ''}
                        my="1"
                        p={!item.deleted ? '0' : '3'}
                      >
                        {!item.deleted ? (
                          <ReactAudioPlayer src={item.src} controls />
                        ) : (
                          <Text>
                            <i className="text-gray-400">{item.content}</i>
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
