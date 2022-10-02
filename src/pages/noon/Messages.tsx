import React, { useEffect, useState } from 'react'
import { Avatar, Flex, Text, Image, Button } from '@chakra-ui/react'
import {
  useClearUnreadMessagesForConversationMutation,
  useGetConversationsByProfileUuidQuery,
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
} from '../../store/chat'

import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser } from '../../store/users'
import ReactAudioPlayer from 'react-audio-player'
import InfiniteScroll from 'react-infinite-scroll-component'

const Messages = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversation = useSelector(getActiveConversation)
  const activeConversee = useSelector(getActiveConversee)

  const [, clearUnreadMessagesForConversation] =
    useClearUnreadMessagesForConversationMutation()

  const [variables, setVariables] = useState({
    limit: 5,
    cursor:
      activeConversation.messages.length !== 0
        ? activeConversation.messages[activeConversation.messages.length - 1]
            .createdAt
        : null,
    conversationUuid: activeConversation.uuid,
  })

  // const [{ data, error, fetching }] = usePostsQuery({
  //   variables,
  // })
  const [shouldPause, setShouldPause] = useState(true)
  const [localMessages, setLocalMessages] = useState([])
  console.log('activeConversation.uuid:', activeConversation.uuid)

  let [{ data, error, fetching }] = useGetMessagesForConversationQuery({
    variables,
    pause: shouldPause,
    requestPolicy: 'network-only',
  })
  // let data = null
  // let localMessages = data
  // useEffect(() => {}, [localMessages])

  console.log('messages in get messages for converstaion:', data)

  // console.log('has more in get messages for converstaion:', data)
  // const AlwaysScrollToBottom = () => {
  //   const elementRef = useRef()
  //   useEffect(() => elementRef.current.scrollIntoView())
  //   return <div ref={elementRef} />
  // }

  useEffect(() => {
    if (data) setLocalMessages(data.getMessagesForConversation.messages)

    return () => {
      setLocalMessages([])
    }
    // if (activeConversation.uuid) {
    //   console.log('activeConversation.uuid:', activeConversation.uuid)

    //   setVariables({
    //     conversationUuid: activeConversation.uuid,
    //     limit: variables.limit,
    //     cursor: null,
    //   })
    // }
  }, [data])

  // TODO check how to initialize data
  useEffect(() => {
    // if (data) {
    if (localMessages.length !== 0) {
      //   console.log(
      //     'data.getMessagesForConversation:',
      //     data.getMessagesForConversation.messages
      //   )

      // setVariables({
      //   conversationUuid: activeConversation.uuid,
      //   limit: variables.limit,
      //   cursor: null,
      // })
      dispatch(
        addMessagesToConversation({
          conversationUuid: activeConversation.uuid,
          messages: localMessages,
          loggedInUser,
        })
      )
    } else {
      // dispatch(
      //   addMessagesToConversation({
      //     conversationUuid: activeConversation.uuid,
      //     messages: activeConversation.messages
      //       ? activeConversation.messages
      //       : [],
      //     loggedInUser,
      //   })
      // )
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
      dispatch(setActiveConversationSet(false))
      dispatch(setActiveConversee(null))
      dispatch(setActiveConversation(null))

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
          data.getMessagesForConversation.messages[
            data.getMessagesForConversation.messages.length - 1
          ].createdAt,
      })

      // dispatch(
      //   addMessagesToConversation({
      //     conversationUuid: activeConversation.uuid,
      //     messages: data ? data.getMessagesForConversation.messages : [],
      //     loggedInUser,
      //   })
      // )
    }, 750)
  }

  return (
    <Flex
      // w="100%"
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

      {/* {data && data.getMessagesForConversation.messages.length !== 0 ? (
        <InfiniteScroll
          dataLength={activeConversation.messages}
          next={fetchMoreMessage}
          style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
          inverse={true}
          hasMore={
            data.getMessagesForConversation
              ? data.getMessagesForConversation.hasMore
              : false
          }
          loader={
            <h4 className="m-auto text-xl py-5 top-0 left-1/2">Loading...</h4>
          }
          scrollableTarget="scrollableDiv"
        > */}
      {/* {this.state.items.map((_, index) => (
            <div style={style} key={index}>
              div - #{index}
            </div>
          ))} */}

      {activeConversation
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
                    >
                      <Text>{item.content}</Text>
                    </Flex>
                  ) : item.type === 'image' ? (
                    <Flex
                      className="justify-end"
                      boxSize="sm"
                      minW="100px"
                      maxW="350px"
                      my="1"
                    >
                      <Image src={item.src} alt={item.content} />
                    </Flex>
                  ) : item.type === 'audio' ? (
                    <Flex
                      className="justify-end bg-red-500"
                      minW="100px"
                      maxW="350px"
                      my="1"
                    >
                      <ReactAudioPlayer src={item.src} controls />
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
                      <Text>{item.content}</Text>
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
        : null}
      {/* <AlwaysScrollToBottom /> */}

      <Button
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
      </Button>
      {/* </InfiniteScroll> */}
      {/* ) : null} */}
      {/* </div> */}
    </Flex>
  )
}

export default Messages
