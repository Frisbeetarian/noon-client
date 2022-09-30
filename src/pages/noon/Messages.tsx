import React, { useEffect, useRef, useState } from 'react'
import { Box, Avatar, Flex, Text, Image, Button } from '@chakra-ui/react'
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

const Messages = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversation = useSelector(getActiveConversation)
  const activeConversee = useSelector(getActiveConversee)

  const [, clearUnreadMessagesForConversation] =
    useClearUnreadMessagesForConversationMutation()

  const [variables, setVariables] = useState({
    limit: 5,
    cursor: null as null | string,
    conversationUuid: activeConversation.uuid,
  })

  // const [{ data, error, fetching }] = usePostsQuery({
  //   variables,
  // })

  const [{ data, error, fetching }] = useGetMessagesForConversationQuery({
    variables,
  })

  // let localMessages = data

  // useEffect(() => {}, [localMessages])

  // console.log('messages:', data)
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef()
    useEffect(() => elementRef.current.scrollIntoView())
    return <div ref={elementRef} />
  }

  // TODO check how to initialize data
  useEffect(() => {
    // if (data) {
    if (data && data.getMessagesForConversation) {
      console.log(
        'data.getMessagesForConversation:',
        data.getMessagesForConversation.messages
      )
      dispatch(
        addMessagesToConversation({
          conversationUuid: activeConversation.uuid,
          messages: data.getMessagesForConversation.messages,
          loggedInUser,
        })
      )
    }
    // }
  }, [data])

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
    }
  }, [])

  return (
    <Flex
      // w="100%"
      overflowY="scroll"
      flexDirection="column"
      className="w-full top-0 py-3 px-5"
    >
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
      <AlwaysScrollToBottom />

      <Button
        onClick={() => {
          setVariables({
            conversationUuid: activeConversation.uuid,
            limit: variables.limit,
            cursor:
              data.getMessagesForConversation.messages[
                data.getMessagesForConversation.messages.length - 1
              ].createdAt,
          })
        }}
        isLoading={fetching}
      >
        Load more messages
      </Button>
    </Flex>
  )
}

export default Messages
