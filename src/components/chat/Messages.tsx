import React, { useEffect, useRef } from 'react'
import { Avatar, Flex, Text } from '@chakra-ui/react'
import { useGetConversationsByProfileUuidQuery } from '../../generated/graphql'

import { setActiveConversation, setActiveConversee } from '../../store/chat'
import { useDispatch } from 'react-redux'

const Messages = ({ messages, profile }) => {
  const dispatch = useDispatch()

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef()
    useEffect(() => elementRef.current.scrollIntoView())
    return <div ref={elementRef} />
  }

  const [{ data, error: conversationsError, fetching: conversationFetching }] =
    useGetConversationsByProfileUuidQuery({
      variables: {
        profileUuid: profile.uuid,
      },
    })

  useEffect(() => {
    if (data?.getConversationsByProfileUuid) {
      dispatch(setActiveConversation(data.getConversationsByProfileUuid))
    }

    return () => {
      dispatch(setActiveConversee(null))
      dispatch(setActiveConversation(null))
    }
  }, [data])

  console.log('CONVERSATIONS:', data)
  return (
    <Flex
      // w="100%"
      overflowY="scroll"
      flexDirection="column"
      // p="3"
      className=" w-full top-0"
    >
      {messages.map((item, index) => {
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
                <Text>{item.text}</Text>
              </Flex>
            </Flex>
          )
        } else {
          return (
            <Flex key={index} w="100%">
              <Avatar
                name="Computer"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                bg="blue.300"
              ></Avatar>
              <Flex
                bg="gray.100"
                color="black"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
              >
                <Text>{item.text}</Text>
              </Flex>
            </Flex>
          )
        }
      })}
      <AlwaysScrollToBottom />
    </Flex>
  )
}

export default Messages
