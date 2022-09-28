import React, { useEffect, useState } from 'react'
import { Button, CloseButton, Flex, Text, useToast } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import Footer from './Footer'
import {
  addConversation,
  addMessageToActiveConversation,
  getActiveConversation,
  getActiveConversationSet,
  getActiveConversee,
  removeConversation,
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
  useCancelPendingCallForConversationMutation,
  useSaveMessageMutation,
  useSendFriendRequestMutation,
  useUpdateUnreadMessagesForConversationMutation,
} from '../../generated/graphql'
import ChatControlsAndSearch from './ChatControlsAndSearch'
import { setFriendFlagOnProfile } from '../../store/profiles'
import { FileUpload } from './FileUpload'

function Chat() {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)

  const [inputMessage, setInputMessage] = useState('')
  const socket = useSelector(getSocket)

  const activeConversation = useSelector(getActiveConversation)
  const activeConversationSet = useSelector(getActiveConversationSet)

  const profile = useSelector(getActiveConversee)
  const [, saveMessage] = useSaveMessageMutation()

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
              loggedInUser: { uuid: from, username: fromUsername },
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
        loggedInUser,
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
      className="flex-col bg-gray-700 text-white box-content "
      style={{ flex: '0.75', height: '100vh' }}
    >
      <ChatControlsAndSearch />
      {/*<Flex w="100%" className="flex-col " style={{ flex: '0.9' }}>*/}
      {profile && activeConversation ? (
        <Flex
          className="flex-col p-0 box-content"
          overflowY="scroll"
          style={{ flex: '0.875' }}
        >
          <Header></Header>
          <FileUpload>
            {/* <div {...getRootProps({ className: 'dropzone' })}> */}
            {/* <input {...getInputProps()} /> */}
            <Messages />
            {/* </div> */}
          </FileUpload>
          {/* <aside>
            <h4>Files</h4>
            <ul>{files}</ul>
          </aside> */}
        </Flex>
      ) : null}

      {/*<Flex className="flex-col" style={{ flex: '0.95' }}>*/}
      {/*  fewfewf*/}
      {/*</Flex>*/}
      {/*</Flex>*/}
      {activeConversation ? (
        <Flex
          w="100%"
          flexDir="column"
          className="justify-center"
          style={{ flex: '0.075' }}
        >
          <Footer
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage}
          />
        </Flex>
      ) : null}
    </Flex>
  )
}

export default Chat
