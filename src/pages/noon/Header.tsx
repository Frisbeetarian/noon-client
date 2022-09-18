import React, { useEffect, useState } from 'react'
import {
  Flex,
  Avatar,
  AvatarBadge,
  Text,
  Button,
  Link,
  Heading,
  CloseButton,
  useToast,
} from '@chakra-ui/react'

import { useDispatch, useSelector } from 'react-redux'
import {
  addConversation,
  cancelPendingCall,
  getActiveConversation,
  getActiveConversee,
} from '../../store/chat'

import { addFriendEntry, getLoggedInUser } from '../../store/users'
import { getSocket } from '../../store/sockets'
import NextLink from 'next/link'
import { useCancelPendingCallForConversationMutation } from '../../generated/graphql'

const Header = () => {
  const activeConversee = useSelector(getActiveConversee)
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const socket = useSelector(getSocket)
  const [online, setOnline] = useState('loading')
  const activeConversation = useSelector(getActiveConversation)

  const [, cancelPendingCallForConversation] =
    useCancelPendingCallForConversationMutation()

  return (
    <Flex w="100%" className="items-center justify-between">
      <Flex className="items-center px-3">
        <Avatar size="md" name={activeConversee.username}>
          <AvatarBadge
            boxSize="1.25em"
            bg={online !== 'true' ? 'yellow.500' : 'green.500'}
          />
        </Avatar>

        <Flex flexDirection="column" mx="3" my="5" justify="center">
          <Text fontSize="lg" fontWeight="bold">
            {activeConversee.username}
          </Text>

          <Text color="green.500" fontSize="sm">
            {online === 'true' ? (
              'Online'
            ) : (
              <span className="opacity-0">f</span>
            )}
          </Text>
        </Flex>
      </Flex>

      {activeConversation?.pendingCall ? (
        <Flex className=" h-full py-4 flex-col justify-end items-end w-1/2">
          <Flex
            className="flex justify-end px-4 py-2 items-center"
            bg="blue.500"
          >
            <Text className="mb-2 mr-3 mt-1 font-black">Call ongoing</Text>

            {activeConversation?.pendingCallProfile?.uuid ===
            loggedInUser?.user?.profile?.uuid ? (
              <Button bg="red.500" className="mr-2">
                <Heading
                  fontSize="md"
                  onClick={async () => {
                    dispatch(
                      cancelPendingCall({
                        conversationUuid: activeConversation.uuid,
                      })
                    )

                    await cancelPendingCallForConversation({
                      conversationUuid: activeConversation.uuid,
                    })

                    socket.emit('cancel-pending-call-for-conversation', {
                      from: loggedInUser.user?.profile?.uuid,
                      fromUsername: loggedInUser.user?.profile?.username,
                      to: activeConversee.uuid,
                      toUsername: activeConversee.username,
                      conversationUuid: activeConversation.uuid,
                    })
                  }}
                >
                  Cancel
                </Heading>
              </Button>
            ) : null}

            <NextLink
              href="/conferences/[id]"
              as={`/conferences/${activeConversation.uuid}`}
            >
              <Link>
                <Button bg="green.500">
                  <Heading fontSize="md">Join</Heading>
                </Button>
              </Link>
            </NextLink>
          </Flex>
        </Flex>
      ) : null}
    </Flex>
  )
}

export default Header
