import React, { useEffect, useState } from 'react'
import { Button, CloseButton, Flex, useToast } from '@chakra-ui/react'
import Footer from './Footer'

import {
  addConversation,
  addMessageToActiveConversation,
  getActiveConversation,
  getActiveConversationSet,
  getActiveConversee,
  removeConversation,
  removeParticipantFromGroup,
  setActiveConversation,
  setActiveConversationSet,
  setActiveConversee,
  setPendingCall,
  setShouldPauseCheckHasMore,
} from '../store/chat'

import { getVideoFrameOpenState } from '../store/video'
import { useDispatch, useSelector } from 'react-redux'
import { getSocket } from '../store/sockets'

import Header from './Header'
import Messages from './Messages'

import {
  addFriendEntry,
  addFriendRequestEntry,
  getLoggedInUser,
  removeFriendEntry,
  removeFriendRequestEntry,
} from '../store/users'

import {
  useAcceptFriendRequestMutation,
  useSaveMessageMutation,
  useSaveGroupMessageMutation,
  useUpdateUnreadMessagesForConversationMutation,
} from '../generated/graphql'

import { getCreateGroupComponent, getChatContainerHeight } from '../store/ui'

import ChatControlsAndSearch from './ChatControlsAndSearch'
import { setFriendFlagOnProfile } from '../store/profiles'

import { FileUpload } from './FileUpload'
import CreateGroup from './CreateGroup'
import Video from './Video'

function Chat() {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const isCreateGroupOpen = useSelector(getCreateGroupComponent)

  const [inputMessage, setInputMessage] = useState('')
  const socket = useSelector(getSocket)

  const activeConversation = useSelector(getActiveConversation)
  const activeConversationSet = useSelector(getActiveConversationSet)
  const videoFrameOpenState = useSelector(getVideoFrameOpenState)
  const chatContainerHeight = useSelector(getChatContainerHeight)

  const profile = useSelector(getActiveConversee)
  const [
    saveMessage,
    // { loading: saveMessageLoading }
  ] = useSaveMessageMutation()
  const [
    saveGroupMessage,
    // { loading: saveGroupLoading }
  ] = useSaveGroupMessageMutation()

  const [
    acceptFriendRequest,
    // {loading: acceptFriendRequestLoading}
  ] = useAcceptFriendRequestMutation()

  const [
    updateUnreadMessagesForConversation,
    // { loading: updateUnreadMessagesLoading },
  ] = useUpdateUnreadMessagesForConversationMutation()
  const toast = useToast()

  useEffect(() => {
    if (socket) {
      socket.on('message-deleted-confirmed', () => {
        alert('delete message confirmed received')
      })

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
              uuid: messageUuid,
              message: data,
              sender: { uuid: from, username: fromUsername },
              from: 'computer',
              conversationUuid,
              loggedInProfile: loggedInUser.user?.profile,
              type,
              src,
            })
          )
        }
      )
    }

    return () => {
      if (socket) {
        socket.off('private-chat-message')
      }
    }
  }, [socket, activeConversationSet])

  useEffect(() => {
    if (socket) {
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
              friend: {
                uuid: from,
                username: fromUsername,
              },
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

        // toast.closeAll()
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

      socket.on('send-friend-request', ({ from, fromUsername }) => {
        dispatch(
          addFriendRequestEntry({
            friendRequest: {
              uuid: from,
              username: fromUsername,
              reverse: true,
            },
          })
        )

        toast({
          id: from,
          title: `${fromUsername} sent you a friend request.`,
          position: 'bottom-right',
          isClosable: true,
          status: 'success',
          duration: null,
          render: () => (
            <Flex direction="column" color="white" p={3} bg="green.500">
              <Flex>
                <p>{fromUsername} sent you a friend request.</p>

                <CloseButton
                  className="sticky top ml-4"
                  size="sm"
                  onClick={() => {
                    toast.close(from)
                  }}
                  name="close button"
                />
              </Flex>

              <Flex className="justify-end mt-3">
                <Button
                  className="mr-3"
                  onClick={async () => {
                    const acceptFriendshipResponse = await acceptFriendRequest({
                      variables: {
                        profileUuid: from,
                      },
                    })

                    dispatch(
                      setFriendFlagOnProfile({
                        profileUuid: from,
                      })
                    )

                    dispatch(
                      removeFriendRequestEntry({
                        profileUuid: from,
                        friendRequests: loggedInUser.user?.friendshipRequests,
                      })
                    )

                    dispatch(
                      addFriendEntry({
                        friend: {
                          uuid: from,
                          username: fromUsername,
                        },
                      })
                    )

                    console.log(
                      'accept friend ship response:',
                      acceptFriendshipResponse
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
                        to: from,
                        toUsername: fromUsername,
                        conversation:
                          acceptFriendshipResponse.data?.acceptFriendRequest,
                      })
                    }

                    toast.close(from)
                  }}
                >
                  Accept
                </Button>

                <Button>Reject</Button>
              </Flex>
            </Flex>
          ),
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
        console.log('active conversation:', activeConversation)
        console.log('conversation uuid:', conversationUuid)

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
        console.log('invited to group received:', conversation)

        dispatch(
          addConversation({
            conversation,
            loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
          })
        )
      })

      socket.on('left-group', ({ fromUuid, conversationUuid }) => {
        dispatch(
          removeParticipantFromGroup({
            conversationUuid,
            participantUuid: fromUuid,
          })
        )
      })

      if (socket) {
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
    }

    return () => {
      if (socket) {
        socket.off('send-friend-request')
        socket.off('cancel-friend-request')
        socket.off('friendship-request-accepted')
        socket.off('unfriend')
        socket.off('set-pending-call-for-conversation')
      }
    }
  }, [socket])

  const handleSendGroupMessage = async () => {
    if (!inputMessage.trim().length) {
      return
    }

    const data = inputMessage
    setInputMessage('')

    const message = await saveGroupMessage({
      variables: {
        message: data,
        type: 'text',
        src: '',
        conversationUuid: activeConversation.uuid,
      },
    })

    activeConversation.profiles.map((profile) => {
      if (profile.uuid !== loggedInUser.user?.profile?.uuid) {
        socket.emit('private-chat-message', {
          content:
            loggedInUser.user?.profile?.username + ' sent you a message.',
          from: loggedInUser.user?.profile?.uuid,
          fromUsername: loggedInUser.user?.profile?.username,
          to: profile.uuid,
          toUsername: profile.username,
          messageUuid: message.data?.saveGroupMessage?.uuid,
          message: data,
          type: 'text',
          src: '',
          conversationUuid: activeConversation.uuid,
        })
      }
    })

    dispatch(
      addMessageToActiveConversation({
        uuid: message.data?.saveGroupMessage?.uuid,
        message: data,
        sender: {
          uuid: loggedInUser?.user?.profile?.uuid,
          username: loggedInUser?.user?.profile?.username,
        },
        from: 'me',
        type: 'text',
        src: '',
        conversationUuid: activeConversation.uuid,
      })
    )
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim().length) {
      return
    }

    const data = inputMessage
    setInputMessage('')

    const message = await saveMessage({
      variables: {
        message: data,
        type: 'text',
        src: '',
        conversationUuid: activeConversation.uuid,
        to: profile.uuid,
      },
    })

    socket.emit('private-chat-message', {
      content: loggedInUser.user?.profile?.username + ' sent you a message.',
      from: loggedInUser.user?.profile?.uuid,
      fromUsername: loggedInUser.user?.profile?.username,
      to: profile.uuid,
      toUsername: profile.username,
      messageUuid: message.data?.saveMessage?.uuid,
      message: data,
      type: 'text',
      src: '',
      conversationUuid: activeConversation.uuid,
    })

    dispatch(
      addMessageToActiveConversation({
        uuid: message.data?.saveMessage?.uuid,
        message: data,
        sender: {
          uuid: loggedInUser?.user?.profile?.uuid,
          username: loggedInUser?.user?.profile?.username,
        },
        from: 'me',
        type: 'text',
        src: '',
        conversationUuid: activeConversation.uuid,
      })
    )
  }

  return (
    <Flex
      className="flex-col bg-gray-700 text-white box-content relative"
      style={{ flex: '0.75', height: '100vh', overflow: 'hidden' }}
    >
      <ChatControlsAndSearch />

      {isCreateGroupOpen ? (
        <Flex
          className="flex-col p-0 box-content"
          style={{ height: chatContainerHeight, transition: 'all .5s' }}
        >
          <CreateGroup />
        </Flex>
      ) : null}

      {activeConversation && activeConversation.type === 'group' ? (
        <Flex
          className="flex-col p-0 box-content"
          style={{ height: chatContainerHeight, transition: 'all .5s' }}
        >
          <Header></Header>

          {videoFrameOpenState !== true ? (
            <FileUpload>
              <Messages />
            </FileUpload>
          ) : (
            <Video
              conversationUuid={activeConversation.uuid}
              profile={loggedInUser.user?.profile}
              email={loggedInUser.user?.email}
            ></Video>
          )}
        </Flex>
      ) : null}

      {profile && activeConversation && activeConversation.type === 'pm' ? (
        <Flex
          className="flex-col p-0 box-content"
          style={{ height: chatContainerHeight, transition: 'all .5s' }}
        >
          <Header></Header>

          {videoFrameOpenState !== true ? (
            <FileUpload>
              <Messages />
            </FileUpload>
          ) : (
            <Video
              conversationUuid={activeConversation.uuid}
              profile={loggedInUser.user?.profile}
              email={loggedInUser.user?.email}
            ></Video>
          )}
        </Flex>
      ) : null}

      {activeConversation ? (
        <Flex
          w="100%"
          flexDir="column"
          className="justify-center"
          style={{ height: '7.5vh' }}
        >
          {activeConversation.type === 'pm' ? (
            <Footer
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSendMessage={handleSendMessage}
            />
          ) : (
            <Footer
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSendMessage={handleSendGroupMessage}
            />
          )}
        </Flex>
      ) : null}
    </Flex>
  )
}

export default Chat
