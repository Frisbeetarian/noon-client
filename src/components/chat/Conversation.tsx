import React from 'react'
import { Flex, Avatar, AvatarBadge, Text } from '@chakra-ui/react'
import { useGetConversationsByProfileUuidQuery } from '../../generated/graphql'

export default function Conversation({ profile }) {
  const [{ data, error: conversationsError, fetching: conversationFetching }] =
    useGetConversationsByProfileUuidQuery({
      variables: {
        profileUuid: profile.uuid,
      },
    })
  console.log('CONVERSATIONS:', data)

  return <Flex w="100%">BOOM</Flex>
}
