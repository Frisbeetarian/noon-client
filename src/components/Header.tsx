import React, { useEffect, useState } from 'react'
import {
  Flex,
  Avatar,
  AvatarBadge,
  Text,
  Button,
  Heading,
} from '@chakra-ui/react'

import { useDispatch, useSelector } from 'react-redux'
import {
  cancelPendingCall,
  getActiveConversation,
  getActiveConversee,
  setPendingCall,
} from '../store/chat'

import { getLoggedInUser } from '../store/users'
import { getSocket } from '../store/sockets'
import { useCancelPendingCallForConversationMutation } from '../generated/graphql'
import { setVideoFrameForConversation } from '../store/video'

const Header = () => {
  const activeConversee = useSelector(getActiveConversee)
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const socket = useSelector(getSocket)
  const [online, setOnline] = useState('loading')
  const activeConversation = useSelector(getActiveConversation)

  const [
    cancelPendingCallForConversation,
    // { loading: cancelPendingCallForConversationLoading },
  ] = useCancelPendingCallForConversationMutation()

  useEffect(() => {
    if (activeConversee) {
      socket.emit('check-friend-connection', {
        from: loggedInUser.user?.profile?.uuid,
        fromUsername: loggedInUser.user?.profile?.username,
        to: activeConversee.uuid,
        toUsername: activeConversee.username,
      })

      // TODO check why session is returning undefined
      socket.on('check-friend-connection', ({ session }) => {
        if (session.connected === true) {
          setOnline('true')
        }
      })

      socket.on('friend-connected', ({ uuid }) => {
        console.log('friend connected:', uuid)
        if (uuid === activeConversee.uuid) {
          setOnline('true')
        }
      })

      socket.on('friend-disconnected', ({ uuid }) => {
        if (uuid === activeConversee.uuid) {
          setOnline('false')
        }
      })
    }

    return () => {
      setOnline('loading')
      socket.off('check-friend-connection')
      socket.off('friend-connected')
      socket.off('friend-disconnected')
    }
  }, [activeConversee])

  return (
    <Flex w="100%" className="items-center justify-between">
      <Flex className="items-center px-3">
        <Avatar
          size="md"
          name={
            activeConversation.type === 'pm'
              ? activeConversee.username
              : activeConversation.name
          }
        >
          {activeConversation.type === 'pm' ? (
            <AvatarBadge
              boxSize="1.25em"
              bg={online !== 'true' ? 'yellow.500' : 'green.500'}
            />
          ) : null}
        </Avatar>

        <Flex flexDirection="column" mx="3" my="5" justify="center">
          <Text fontSize="lg" fontWeight="bold">
            {activeConversation.type === 'pm'
              ? activeConversee.username
              : activeConversation.name}
          </Text>

          {activeConversation.type === 'pm' ? (
            <Text color="green.500" fontSize="sm">
              {online === 'true' ? (
                'Online'
              ) : (
                <span className="opacity-0">f</span>
              )}
            </Text>
          ) : null}
        </Flex>

        {activeConversation.type === 'group'
          ? activeConversation.profiles.map((item, index) => {
              return (
                <Text key={index} className="mr-2">
                  {item.username},
                </Text>
              )
            })
          : null}
      </Flex>

      {activeConversation?.pendingCall ? (
        <Flex className="h-full py-4 flex-col justify-end items-end w-1/2">
          <Flex
            className="flex justify-end px-4 py-2 items-center"
            bg="blue.500"
          >
            <Text className="mb-2 mr-3 mt-1 font-black">Call ongoing</Text>

            <Button bg="red.500" className="mr-2">
              <Heading
                fontSize="md"
                onClick={async () => {
                  dispatch(
                    cancelPendingCall({
                      conversationUuid: activeConversation.uuid,
                      loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
                    })
                  )

                  await cancelPendingCallForConversation({
                    variables: {
                      conversationUuid: activeConversation.uuid,
                      profileUuid: loggedInUser.user?.profile?.uuid,
                    },
                  })

                  activeConversation.calls.map((call) => {
                    socket.emit('cancel-pending-call-for-conversation', {
                      from: loggedInUser.user?.profile?.uuid,
                      fromUsername: loggedInUser.user?.profile?.username,
                      to: call.profileUuid,
                      toUsername: call.profileUsername,
                      conversationUuid: activeConversation.uuid,
                    })
                  })
                }}
              >
                Cancel
              </Heading>
            </Button>

            <Button bg="green.500">
              <Heading
                fontSize="md"
                onClick={async () => {
                  dispatch(setVideoFrameForConversation(true))

                  dispatch(
                    setPendingCall({
                      profileUuid: loggedInUser.user?.profile?.uuid,
                      from: 'fewfewf',
                      fromJoin: true,
                      pendingCall: false,
                      ongoingCall: false,
                      conversationUuid: activeConversation.uuid,
                    })
                  )
                }}
              >
                Join
              </Heading>
            </Button>
          </Flex>
        </Flex>
      ) : null}
    </Flex>
  )
}

export default Header
