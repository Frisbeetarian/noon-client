import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '@chakra-ui/react'

import {
  addFriendEntry,
  addFriendRequestEntry,
  getLoggedInUser,
  removeFriendEntry,
  removeFriendRequestEntry,
} from '../../store/users'

import {
  addProfiles,
  cancelFriendshipRequestSentOnProfile,
  setFriendFlagOnProfile,
  setFriendshipRequestSentOnProfile,
  setHasFriendshipRequestFromLoggedInProfile,
} from '../../store/profiles'

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
import withAxios from '../../utils/withAxios'
import { setSearchLoading } from '../../store/search'
import useAppAlert from '../../hooks/useAppAlert'
import {
  acceptFriendRequest,
  rejectFriendRequest,
} from '../../utils/friendRequestActions'

function SocketControls({ axios }) {
  const dispatch = useDispatch()
  const toast = useToast()
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversationSet = useSelector(getActiveConversationSet)
  const activeConversation = useSelector(getActiveConversation)
  const socketAuthObject = useSelector(getSocketAuthObject)
  const socket = SocketManager.getInstance(socketAuthObject)?.getSocket()
  const showAppAlert = useAppAlert()

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

        dispatch(
          setHasFriendshipRequestFromLoggedInProfile({
            profileUuid: senderUuid,
          })
        )

        showAppAlert({
          id: senderUuid + 'friend-request',
          title: `${senderUsername} sent you a friend request.`,
          status: 'info',
          duration: null,
          onAccept: () =>
            acceptFriendRequest({
              axios,
              dispatch,
              friendRequest: { uuid: senderUuid, username: senderUsername },
              loggedInUser,
              setFriendFlagOnProfile,
              removeFriendRequestEntry,
              addFriendEntry,
              addConversation,
              toastId: senderUuid.uuid + 'friend-request',
              toast,
            }),
          onReject: () =>
            rejectFriendRequest({
              axios,
              dispatch,
              friendRequest: { uuid: senderUuid, username: senderUsername },
              loggedInUser,
              cancelFriendshipRequestSentOnProfile,
              removeFriendRequestEntry,
              toastId: senderUuid.uuid + 'friend-request',
              toast,
            }),
          customRender: true,
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
              name: senderUsername,
            })
          )

          dispatch(
            addConversation({
              conversation: conversation,
              loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
            })
          )

          showAppAlert({
            id: senderUuid,
            title: `${senderUsername} accepted your friend request.`,
            status: 'info',
            isClosable: true,
            duration: 5000,
            customRender: true,
            description: `You are now friends with ${senderUsername}.`,
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

        showAppAlert({
          id: senderUuid,
          title: `${senderUsername} cancelled your friend request.`,
          status: 'info',
          isClosable: true,
          duration: 5000,
          senderUuid,
          senderUsername,
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
  }, [socket, socketAuthObject, loggedInUser])

  return null
}

export default withAxios(SocketControls)
