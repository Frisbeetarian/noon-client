import React, { useEffect, useState } from 'react'
import { Button, CloseButton, Flex, Text, useToast } from '@chakra-ui/react'
import Footer from './Footer'

import {
  addConversation,
  addMessageToActiveConversation,
  getActiveConversation,
  getActiveConversationSet,
  getActiveConversee,
  removeConversation,
  setActiveConversation,
  setActiveConversationSet,
  setActiveConversee,
  setShouldPauseCheckHasMore,
} from '../../store/chat'

import { useDispatch, useSelector } from 'react-redux'
import { getSocket } from '../../store/sockets'
import Header from './Header'

import Messages from './Messages'

import {
  addFriendEntry,
  addFriendRequestEntry,
  getLoggedInUser,
  removeFriendEntry,
  removeFriendRequestEntry,
} from '../../store/users'

import {
  useAcceptFriendRequestMutation,
  useSaveMessageMutation,
  useSaveGroupMessageMutation,
  useSendFriendRequestMutation,
  useUpdateUnreadMessagesForConversationMutation,
} from '../../generated/graphql'

import {
  setCreateGroupComponent,
  getCreateGroupComponent,
} from '../../store/ui'
import { createGroup, getGroups } from '../../store/groups'

import ChatControlsAndSearch from './ChatControlsAndSearch'
import { setFriendFlagOnProfile } from '../../store/profiles'

import { FileUpload } from './FileUpload'
import CreateGroup from './CreateGroup'

function Chat() {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const isCreateGroupOpen = useSelector(getCreateGroupComponent)

  const [inputMessage, setInputMessage] = useState('')
  const socket = useSelector(getSocket)

  const activeConversation = useSelector(getActiveConversation)
  const activeConversationSet = useSelector(getActiveConversationSet)

  const profile = useSelector(getActiveConversee)
  const [, saveMessage] = useSaveMessageMutation()
  const [, saveGroupMessage] = useSaveGroupMessageMutation()

  const [, sendFriendRequest] = useSendFriendRequestMutation()
  const [, acceptFriendRequest] = useAcceptFriendRequestMutation()
  const [socketError, setSocketError] = useState(false)

  const [, updateUnreadMessagesForConversation] =
    useUpdateUnreadMessagesForConversationMutation()
  const toast = useToast()

  useEffect(() => {
    if (socket) {
      socket.on(
        'private-chat-message',
        ({
          content,
          from,
          fromUsername,
          to,
          message,
          conversationUuid,
          type,
          src,
        }) => {
          if (!message.trim().length) {
            return
          }

          console.log('RECEIVED MESSAGES:', message)
          console.log('activeConversation:', activeConversationSet)

          const data = message

          if (
            activeConversationSet === false ||
            conversationUuid !== activeConversation.uuid
          ) {
            console.log('entering update')
            updateUnreadMessagesForConversation({
              conversationUuid: conversationUuid,
              profileUuid: loggedInUser?.user?.profile?.uuid,
            })
          }
          // if (activeConversation) {

          dispatch(
            addMessageToActiveConversation({
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
        ({ content, from, fromUsername, to, conversation }) => {
          // dispatch(
          //   setFriendFlagOnProfile({
          //     profileUuid: from,
          //   })
          // )

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
                  />
                </Flex>
              </Flex>
            ),
          })
        }
      )

      socket.on(
        'cancel-friend-request',
        ({ content, from, fromUsername, to }) => {
          dispatch(
            dispatch(
              removeFriendRequestEntry({
                profileUuid: from,
                friendRequests: loggedInUser.user?.friendshipRequests,
              })
            )
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
        }
      )

      socket.on(
        'send-friend-request',
        ({ content, from, fromUsername, to }) => {
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
                  />
                </Flex>

                <Flex className="justify-end mt-3">
                  <Button
                    className="mr-3"
                    onClick={async () => {
                      const acceptFriendshipResponse =
                        await acceptFriendRequest({
                          profileUuid: from,
                        })

                      dispatch(
                        setFriendFlagOnProfile({
                          profileUuid: from,
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
        }
      )

      socket.on(
        'unfriend',
        ({ content, from, fromUsername, to, conversationUuid }) => {
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
        }
      )

      socket.on(
        'invited-to-group',
        ({ fromUuid, fromUsername, conversation, groupUuid, participants }) => {
          console.log('invited to group received:', conversation)

          dispatch(
            addConversation({
              conversation,
              loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
            })
          )
        }
      )
    }

    return () => {
      if (socket) {
        // setOnline('loading')
        socket.off('send-friend-request')
        socket.off('cancel-friend-request')
        socket.off('friendship-request-accepted')
        socket.off('unfriend')
      }
    }
  }, [socket])

  const handleSendGroupMessage = async () => {
    if (!inputMessage.trim().length) {
      return
    }

    console.log('input message:', inputMessage)
    const data = inputMessage
    setInputMessage('')

    // socket.emit('group-chat-message', {
    //   content:
    //     loggedInUser.user?.profile?.username + ' sent a message to the group.',
    //   from: loggedInUser.user?.profile?.uuid,
    //   fromUsername: loggedInUser.user?.profile?.username,
    //   groupUuid: activeConversation.uuid,
    //   groupUsername: activeConversation.name,
    //   message: data,
    //   type: 'text',
    //   src: '',
    //   conversationUuid: activeConversation.uuid,
    // })

    activeConversation.profiles.map((profile) => {
      if (profile.uuid !== loggedInUser.user?.profile?.uuid) {
        socket.emit('private-chat-message', {
          content:
            loggedInUser.user?.profile?.username + ' sent you a message.',
          from: loggedInUser.user?.profile?.uuid,
          fromUsername: loggedInUser.user?.profile?.username,
          to: profile.uuid,
          toUsername: profile.username,
          message: data,
          type: 'text',
          src: '',
          conversationUuid: activeConversation.uuid,
        })
      }
    })

    dispatch(
      addMessageToActiveConversation({
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

    await saveGroupMessage({
      message: data,
      type: 'text',
      src: '',
      conversationUuid: activeConversation.uuid,
    })
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim().length) {
      return
    }

    // inputMessage = { ...inputMessage, type: 'text', src: null }
    console.log('input message:', inputMessage)
    const data = inputMessage
    // setMessages((old) => [...old, { from: 'me', text: data }])
    setInputMessage('')

    socket.emit('private-chat-message', {
      content: loggedInUser.user?.profile?.username + ' sent you a message.',
      from: loggedInUser.user?.profile?.uuid,
      fromUsername: loggedInUser.user?.profile?.username,
      to: profile.uuid,
      toUsername: profile.username,
      message: data,
      type: 'text',
      src: '',
      conversationUuid: activeConversation.uuid,
    })

    dispatch(
      addMessageToActiveConversation({
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

    await saveMessage({
      message: data,
      type: 'text',
      src: '',
      conversationUuid: activeConversation.uuid,
      to: profile.uuid,
    })
  }

  return (
    <Flex
      className="flex-col bg-gray-700 text-white box-content"
      style={{ flex: '0.75', height: '100vh' }}
    >
      <ChatControlsAndSearch />

      {isCreateGroupOpen ? (
        <Flex className="flex-col p-0 box-content" style={{ flex: '0.875' }}>
          <CreateGroup />
        </Flex>
      ) : null}

      {activeConversation && activeConversation.type === 'group' ? (
        <Flex className="flex-col p-0 box-content" style={{ flex: '0.875' }}>
          <Header></Header>
          <FileUpload>
            <Messages />
          </FileUpload>
        </Flex>
      ) : null}

      {profile && activeConversation && activeConversation.type === 'pm' ? (
        <Flex className="flex-col p-0 box-content" style={{ flex: '0.875' }}>
          <Header></Header>
          <FileUpload>
            <Messages />
          </FileUpload>
        </Flex>
      ) : null}

      {activeConversation ? (
        <Flex
          w="100%"
          flexDir="column"
          className="justify-center"
          style={{ flex: '0.075' }}
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
