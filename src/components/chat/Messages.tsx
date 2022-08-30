import React, { useEffect, useRef } from 'react'
import { Avatar, Flex, Text } from '@chakra-ui/react'
import {
  useClearUnreadMessagesForConversationMutation,
  useGetConversationsByProfileUuidQuery,
} from '../../generated/graphql'

import {
  getActiveConversation,
  getActiveConversee,
  setActiveConversation,
  setActiveConversee,
} from '../../store/chat'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser } from '../../store/users'

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
    }

    return () => {
      dispatch(setActiveConversee(null))
      dispatch(setActiveConversation(null))
    }
  }, [])

  return (
    <Flex
      // w="100%"
      overflowY="scroll"
      flexDirection="column"
      className=" w-full top-0"
    >
      {activeConversation
        ? activeConversation.messages.map((item, index) => {
            if (item.from === 'me') {
              return (
                <Flex key={index} w="100%" justify="flex-end">
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
                </Flex>
              )
            } else {
              return (
                <Flex className="items-center" key={index} w="100%">
                  <Avatar
                    size="sm"
                    name={activeConversee.username}
                    className="mr-2"
                  ></Avatar>

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
