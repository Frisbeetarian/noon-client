import React, { useEffect, useRef } from 'react'
import { Box, Avatar, Flex, Text, Image } from '@chakra-ui/react'
import {
  useClearUnreadMessagesForConversationMutation,
  useGetConversationsByProfileUuidQuery,
} from '../../generated/graphql'

import {
  clearUnreadMessagesForConversationInStore,
  getActiveConversation,
  getActiveConversee,
  setActiveConversation,
  setActiveConversationSet,
  setActiveConversee,
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

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef()
    useEffect(() => elementRef.current.scrollIntoView())
    return <div ref={elementRef} />
  }

  // useEffect(() => {
  //   if (activeConversation === null) {
  //     dispatch(setActiveConversation(activeConversation))
  //   }
  // }, [])
  //

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
    </Flex>
  )
}

export default Messages
