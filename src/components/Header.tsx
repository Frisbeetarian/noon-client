// @ts-nocheck
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
import SocketManager from './SocketIo/SocketManager'

import { getLoggedInUser } from '../store/users'
// import { getSocket } from '../store/sockets'
// import { useCancelPendingCallForConversationMutation } from '../generated/graphql'
import { setVideoFrameForConversation } from '../store/video'
import { getIsMobile } from '../store/ui'
import { getSocketAuthObject } from '../store/sockets'
import { AiOutlineGroup } from 'react-icons/ai'

const Header = () => {
  const socketAuthObject = useSelector(getSocketAuthObject)

  const activeConversee = useSelector(getActiveConversee)
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const socket = SocketManager.getInstance(socketAuthObject)?.getSocket()

  const [online, setOnline] = useState('loading')
  const activeConversation = useSelector(getActiveConversation)
  const isMobile = useSelector(getIsMobile)

  // const [
  //   cancelPendingCallForConversation,
  //   // { loading: cancelPendingCallForConversationLoading },
  // ] = useCancelPendingCallForConversationMutation()

  useEffect(() => {
    if (activeConversee && socket) {
      socket.emit('check-friend-connection', {
        from: loggedInUser.user?.profile?.uuid,
        fromUsername: loggedInUser.user?.profile?.username,
        to: activeConversee.uuid,
        toUsername: activeConversee.username,
      })

      // TODO check why session is returning undefined
      socket?.on('check-friend-connection', ({ session }) => {
        if (session?.connected === true) {
          setOnline('true')
        }
      })

      socket?.on('friend-connected', ({ uuid }) => {
        console.log('friend connected:', uuid)
        if (uuid === activeConversee.uuid) {
          setOnline('true')
        }
      })

      socket?.on('friend-disconnected', ({ uuid }) => {
        if (uuid === activeConversee.uuid) {
          setOnline('false')
        }
      })
    }

    return () => {
      setOnline('loading')
      socket?.off('check-friend-connection')
      socket?.off('friend-connected')
      socket?.off('friend-disconnected')
    }
  }, [activeConversee, socket, loggedInUser.user?.profile?.uuid])

  return (
    <Flex
      w="100%"
      className={
        isMobile
          ? 'flex-col items-center justify-between'
          : 'flex-col p-3 justify-between'
      }
    >
      <Flex
        className={
          isMobile ? 'flex-col items-start px-1' : 'items-center px-1 md:px-3'
        }
      >
        <Flex>
          {activeConversation.type === 'pm' ? (
            <Avatar
              size={isMobile ? 'sm' : 'md'}
              bg="black"
              name={activeConversee.username}
              className={isMobile ? 'mr-2' : ''}
            >
              <AvatarBadge
                className="-mt-1 mr-1"
                outline="0"
                border="2px solid black"
                boxSize={isMobile ? '1.1em' : '1.1em'}
                bg={online !== 'true' ? 'yellow.500' : 'green.500'}
              />
            </Avatar>
          ) : (
            <Avatar
              className={isMobile ? 'mr-2' : ''}
              size={isMobile ? 'sm' : 'md'}
              bg="black"
              name={activeConversation.name}
              icon={<AiOutlineGroup fontSize="1rem" />}
            ></Avatar>
          )}

          <Flex flexDirection={isMobile ? 'column' : 'column'}>
            <Text fontSize={isMobile ? 'lg' : 'lg'} fontWeight="bold">
              {activeConversation.type === 'pm'
                ? activeConversee.username
                : activeConversation.name}
            </Text>

            {activeConversation.type === 'pm' ? (
              <Text color="green.500" fontSize="sm">
                {online === 'true' ? (
                  'Online'
                ) : (
                  <span className="text-yellow-500">Offline</span>
                )}
              </Text>
            ) : null}
          </Flex>
        </Flex>
        <Flex className="">
          {activeConversation.type === 'group'
            ? activeConversation.profiles.map((item, index) => {
                return (
                  <Text
                    key={index}
                    className={isMobile ? 'mr-2 text-sm' : 'mr-2'}
                  >
                    {item.username},
                  </Text>
                )
              })
            : null}
        </Flex>
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

                  // await cancelPendingCallForConversation({
                  //   variables: {
                  //     conversationUuid: activeConversation.uuid,
                  //     profileUuid: loggedInUser.user?.profile?.uuid,
                  //   },
                  // })

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
                      from: 'me',
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
