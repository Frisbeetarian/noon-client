import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CloseButton, Flex, useToast } from '@chakra-ui/react'

import {
  addFriendEntry,
  addFriendRequestEntry,
  getLoggedInUser,
  removeFriendEntry,
  removeFriendRequestEntry,
} from '../../store/users'

import { addProfiles, setFriendFlagOnProfile } from '../../store/profiles'

import {
  addConversation,
  addMessageToActiveConversation,
  deleteMessageInStore,
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

import SocketManager from './SocketManager'

import { getSocketAuthObject } from '../../store/sockets'
import AppButton from '../AppComponents/AppButton'
import withAxios from '../../utils/withAxios'
import { setSearchLoading } from '../../store/search'

function SocketControls({ axios }) {
  const dispatch = useDispatch()
  const toast = useToast()
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversationSet = useSelector(getActiveConversationSet)
  const activeConversation = useSelector(getActiveConversation)
  const socketAuthObject = useSelector(getSocketAuthObject)
  const socket = SocketManager.getInstance(socketAuthObject)?.getSocket()

  useEffect(() => {
    if (socket) {
      socket.on(
        'send-message',
        ({ senderUuid, senderUsername, conversationUuid, message }) => {
          // if (!message.trim().length) {
          //   return
          // }

          const data = message
          if (
            activeConversationSet === false ||
            conversationUuid !== activeConversation.uuid
          ) {
            // updateUnreadMessagesForConversation({
            //   variables: {
            //     conversationUuid: conversationUuid,
            //     profileUuid: loggedInUser?.user?.profile?.uuid,
            //   },
            // })
          }

          dispatch(
            addMessageToActiveConversation({
              message: {
                uuid: message.uuid,
                content: data.content,
                // @ts-ignore
                sender: { uuid: senderUuid, username: senderUsername },
                from: 'other',
                conversationUuid,
                type: message.type,
                src: message.src,
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

      socket.on('message-deleted', ({ messageUuid, conversationUuid }) => {
        dispatch(
          deleteMessageInStore({
            uuid: messageUuid,
            content: 'Message has been deleted.',
            deleted: true,
            conversationUuid: conversationUuid,
          })
        )
      })

      socket.on(
        'send-file',
        ({
          senderProfileUuid,
          senderProfileUsername,
          conversationUuid,
          messageUuid,
          messageType,
          filePath,
        }) => {
          if (
            activeConversationSet === false ||
            conversationUuid !== activeConversation.uuid
          ) {
            // updateUnreadMessagesForConversation({
            //   variables: {
            //     conversationUuid: conversationUuid,
            //     profileUuid: loggedInUser?.user?.profile?.uuid,
            //   },
            // })
          }

          dispatch(
            addMessageToActiveConversation({
              message: {
                uuid: messageUuid,
                content: '',
                // @ts-ignore
                sender: {
                  uuid: senderProfileUuid,
                  username: senderProfileUsername,
                },
                from:
                  loggedInUser.user.profile.uuid === senderProfileUuid
                    ? 'me'
                    : 'other',
                conversationUuid,
                type: messageType,
                src: filePath,
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
        dispatch(
          addFriendRequestEntry({
            uuid: senderUuid,
            username: senderUsername,
            reverse: true,
          })
        )

        toast({
          id: senderUuid + 'friend-request',
          title: `${senderUsername} sent you a friend request.`,
          position: 'bottom-right',
          isClosable: true,
          status: 'success',
          duration: null,
          render: () => (
            <Flex direction="column" color="white" p={3} bg="#4B0E10">
              <Flex>
                <p>{senderUsername} sent you a friend request.</p>

                <CloseButton
                  className="sticky top ml-4"
                  size="sm"
                  onClick={() => {
                    toast.close(senderUuid + 'friend-request')
                  }}
                  name="close button"
                />
              </Flex>

              <Flex className="justify-end mt-3">
                <AppButton
                  className="mr-3"
                  onClick={async () => {
                    const response = await axios.post(
                      '/api/profiles/acceptFriendRequest',
                      {
                        profileUuid: senderUuid,
                      }
                    )

                    if (response.status === 200) {
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
                          conversation: response.data,
                          loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
                        })
                      )

                      toast.close(senderUuid + 'friend-request')
                    }

                    // dispatch(
                    //   setFriendFlagOnProfile({
                    //     profileUuid: senderUuid,
                    //   })
                    // )
                    //
                    // dispatch(
                    //   removeFriendRequestEntry({
                    //     profileUuid: senderUuid,
                    //     friendRequests: loggedInUser.user?.friendshipRequests,
                    //   })
                    // )
                    //
                    // dispatch(
                    //   addFriendEntry({
                    //     uuid: senderUuid,
                    //     username: senderUsername,
                    //   })
                    // )

                    // dispatch(
                    //   addConversation({
                    //     // @ts-ignore
                    //     conversation:
                    //       acceptFriendshipResponse.data?.acceptFriendRequest,
                    //     loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
                    //   })
                    // )

                    // if (acceptFriendshipResponse) {
                    //   socket?.emit('friendship-request-accepted', {
                    //     content:
                    //       loggedInUser.user?.profile?.username +
                    //       ' accepted your friend request.',
                    //     from: loggedInUser.user?.profile?.uuid,
                    //     fromUsername: loggedInUser.user?.profile?.username,
                    //     to: senderUuid,
                    //     toUsername: senderUsername,
                    //     conversation:
                    //       acceptFriendshipResponse.data?.acceptFriendRequest,
                    //   })
                    // }

                    // toast.close(senderUuid)
                  }}
                >
                  Accept
                </AppButton>

                <AppButton bg="black">Reject</AppButton>
              </Flex>
            </Flex>
          ),
        })
      })

      socket.on(
        'friendship-request-accepted',
        ({ senderUuid, senderUsername, conversation }) => {
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
              conversation: conversation,
              loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
            })
          )

          toast({
            id: senderUuid,
            title: `${senderUsername} accepted your friend request.`,
            position: 'bottom-right',
            isClosable: true,
            status: 'success',
            duration: 5000,
            render: () => (
              <Flex direction="column" color="white" p={3} bg="#4B0E10">
                <Flex>
                  <p>{senderUsername} accepted your friend request.</p>

                  <CloseButton
                    className="sticky top ml-4"
                    size="sm"
                    onClick={() => {
                      toast.close(senderUuid)
                    }}
                    name="close button"
                  />
                </Flex>
              </Flex>
            ),
          })
        }
      )

      socket.on('cancel-friend-request', ({ senderUuid, senderUsername }) => {
        dispatch(
          removeFriendRequestEntry({
            profileUuid: senderUuid,
            friendRequests: loggedInUser.user?.friendshipRequests,
          })
        )

        toast.close(senderUuid + 'friend-request')
        toast({
          id: senderUuid,
          title: `${senderUsername} has cancelled the friend request.`,
          position: 'bottom-right',
          isClosable: true,
          status: 'error',
          duration: 5000,
          render: () => (
            <Flex direction="column" color="white" p={3} bg="#4B0E10">
              <Flex>
                <p>{senderUsername} has cancelled the friend request.</p>

                <CloseButton
                  className="sticky top ml-4"
                  size="sm"
                  onClick={() => {
                    toast.close(senderUuid)
                  }}
                  name="close button"
                />
              </Flex>
            </Flex>
          ),
        })
      })

      socket.on('unfriend', ({ senderUuid, conversationUuid }) => {
        dispatch(
          removeFriendEntry({
            profileUuid: senderUuid,
            friends: loggedInUser.user?.profile?.friends,
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

      socket.on('added-to-group', ({ conversation }) => {
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

      socket.on('search-results', (profiles) => {
        dispatch(setSearchLoading(false))

        dispatch(
          addProfiles({
            profiles: profiles,
            loggedInUser: loggedInUser.user,
          })
        )
      })
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
        socket.off('send-message')
        socket.off('send-message-to-group')
        socket.off('message-deleted')
        socket.off('search-results')
      }
    }
  }, [socket, socketAuthObject])

  return null
}

export default withAxios(SocketControls)
