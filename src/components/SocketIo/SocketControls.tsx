import React, { useEffect } from 'react'
import {
  addFriendEntry,
  addFriendRequestEntry,
  getLoggedInUser,
  removeFriendEntry,
  removeFriendRequestEntry,
} from '../../store/users'

import { Button, CloseButton, Flex, useToast } from '@chakra-ui/react'
import { setFriendFlagOnProfile } from '../../store/profiles'

import {
  addConversation,
  addMessageToActiveConversation,
  getActiveConversation,
  getActiveConversationSet,
  removeConversation,
  removeParticipantFromGroup,
  setActiveConversation,
  setActiveConversationSet,
  setActiveConversee,
  setPendingCall,
  setShouldPauseCheckHasMore,
} from '../../store/chat'

import { useDispatch, useSelector } from 'react-redux'
import SocketManager from './SocketManager'
// import { getSocketId } from '../../store/sockets'

import {
  useAcceptFriendRequestMutation,
  useUpdateUnreadMessagesForConversationMutation,
} from '../../generated/graphql'

function SocketControls() {
  const dispatch = useDispatch()
  const socket = SocketManager.getSocket()
  const toast = useToast()
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversationSet = useSelector(getActiveConversationSet)
  const activeConversation = useSelector(getActiveConversation)

  const [
    acceptFriendRequest,
    // {loading: acceptFriendRequestLoading}
  ] = useAcceptFriendRequestMutation()

  const [
    updateUnreadMessagesForConversation,
    // { loading: updateUnreadMessagesLoading },
  ] = useUpdateUnreadMessagesForConversationMutation()

  useEffect(() => {
    console.log('socket in socket controls:', socket)

    if (socket) {
      socket.on(
        'private-chat-message',
        ({
          from,
          fromUsername,
          messageUuid,
          message,
          conversationUuid,
          type,
          src,
        }) => {
          if (!message.trim().length) {
            return
          }

          const data = message
          if (
            activeConversationSet === false ||
            conversationUuid !== activeConversation.uuid
          ) {
            updateUnreadMessagesForConversation({
              variables: {
                conversationUuid: conversationUuid,
                profileUuid: loggedInUser?.user?.profile?.uuid,
              },
            })
          }

          dispatch(
            addMessageToActiveConversation({
              message: {
                uuid: messageUuid,
                content: data,
                sender: { uuid: from, username: fromUsername },
                from: 'other',
                conversationUuid,
                type,
                src,
                //TODO get deleted from payload
                deleted: false,
                updatedAt: new Date().toString(),
                createdAt: new Date().toString(),
              },
              loggedInProfileUuid: loggedInUser.user?.profile.uuid,
            })
          )
        }
      )

      socket.on('send-friend-request', ({ senderUuid, senderUsername }) => {
        console.log('SEND FRIEND REQUEST RECEIVED')
        dispatch(
          addFriendRequestEntry({
            uuid: senderUuid,
            username: senderUsername,
            reverse: true,
          })
        )

        toast({
          id: senderUuid,
          title: `${senderUsername} sent you a friend request.`,
          position: 'bottom-right',
          isClosable: true,
          status: 'success',
          duration: null,
          render: () => (
            <Flex direction="column" color="white" p={3} bg="green.500">
              <Flex>
                <p>{senderUsername} sent you a friend request.</p>

                <CloseButton
                  className="sticky top ml-4"
                  size="sm"
                  onClick={() => {
                    toast.close(senderUuid)
                  }}
                  name="close button"
                />
              </Flex>

              <Flex className="justify-end mt-3">
                <Button
                  variant="green"
                  className="mr-3"
                  onClick={async () => {
                    const acceptFriendshipResponse = await acceptFriendRequest({
                      variables: {
                        profileUuid: senderUuid,
                      },
                    })

                    dispatch(
                      setFriendFlagOnProfile({
                        profileUuid: senderUuid,
                      })
                    )

                    dispatch(
                      removeFriendRequestEntry({
                        profileUuid: senderUuid,
                        friendRequests: loggedInUser.user?.friendshipRequests,
                      })
                    )

                    dispatch(
                      addFriendEntry({
                        uuid: senderUuid,
                        username: senderUsername,
                      })
                    )

                    dispatch(
                      addConversation({
                        conversation:
                          acceptFriendshipResponse.data?.acceptFriendRequest,
                        loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
                      })
                    )

                    if (acceptFriendshipResponse) {
                      socket.emit('friendship-request-accepted', {
                        content:
                          loggedInUser.user?.profile?.username +
                          ' accepted your friend request.',
                        from: loggedInUser.user?.profile?.uuid,
                        fromUsername: loggedInUser.user?.profile?.username,
                        to: senderUuid,
                        toUsername: senderUsername,
                        conversation:
                          acceptFriendshipResponse.data?.acceptFriendRequest,
                      })
                    }

                    toast.close(senderUuid)
                  }}
                >
                  Accept
                </Button>

                <Button bg="tomato">Reject</Button>
              </Flex>
            </Flex>
          ),
        })
      })

      socket.on(
        'friendship-request-accepted',
        ({ from, fromUsername, conversation }) => {
          dispatch(
            removeFriendRequestEntry({
              profileUuid: from,
              friendRequests: loggedInUser.user?.friendshipRequests,
            })
          )

          dispatch(
            addFriendEntry({
              uuid: from,
              username: fromUsername,
            })
          )

          dispatch(
            addConversation({
              conversation: conversation,
              loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
            })
          )

          toast({
            id: from,
            title: `${fromUsername} accepted your friend request.`,
            position: 'bottom-right',
            isClosable: true,
            status: 'success',
            duration: 5000,
            render: () => (
              <Flex direction="column" color="white" p={3} bg="green.500">
                <Flex>
                  <p>{fromUsername} accepted your friend request.</p>

                  <CloseButton
                    className="sticky top ml-4"
                    size="sm"
                    onClick={() => {
                      toast.close(from)
                    }}
                    name="close button"
                  />
                </Flex>
              </Flex>
            ),
          })
        }
      )

      socket.on('cancel-friend-request', ({ from, fromUsername }) => {
        dispatch(
          removeFriendRequestEntry({
            profileUuid: from,
            friendRequests: loggedInUser.user?.friendshipRequests,
          })
        )

        toast.close(from)
        toast({
          id: from,
          title: `${fromUsername} has cancelled the friend request.`,
          position: 'bottom-right',
          isClosable: true,
          status: 'error',
          duration: 5000,
        })
      })

      socket.on('unfriend', ({ from, conversationUuid }) => {
        dispatch(
          removeFriendEntry({
            profileUuid: from,
            friends: loggedInUser.user?.friends,
          })
        )

        dispatch(removeConversation({ conversationUuid }))

        if (
          activeConversation &&
          activeConversation.uuid === conversationUuid
        ) {
          dispatch(setActiveConversationSet(false))
          dispatch(setActiveConversee(null))
          dispatch(setActiveConversation(null))
          dispatch(setShouldPauseCheckHasMore(false))
        }
      })

      socket.on('invited-to-group', ({ conversation }) => {
        dispatch(
          addConversation({
            conversation,
            loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
          })
        )
      })

      socket.on(
        'left-group',
        ({
          fromUuid,
          conversationUuid,
        }: {
          fromUuid: string
          conversationUuid: string
        }) => {
          dispatch(
            removeParticipantFromGroup({
              conversationUuid: conversationUuid,
              participantUuid: fromUuid,
            })
          )
        }
      )

      socket.on(
        'set-pending-call-for-conversation',
        ({ conversationUuid, from }) => {
          dispatch(
            setPendingCall({
              profileUuid: loggedInUser.user?.profile?.uuid,
              from,
              pendingCall: true,
              ongoingCall: false,
              conversationUuid,
            })
          )
        }
      )
    }

    return () => {
      if (socket) {
        socket.off('send-friend-request')
        socket.off('cancel-friend-request')
        socket.off('friendship-request-accepted')
        socket.off('unfriend')
        socket.off('set-pending-call-for-conversation')
        socket.off('invited-to-group')
        socket.off('left-group')
      }
    }
  }, [socket])

  return null
}

export default SocketControls
