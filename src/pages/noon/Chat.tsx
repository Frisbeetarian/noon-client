import React, { useEffect, useState } from 'react'
import { Button, CloseButton, Flex, Text, useToast } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import Footer from './Footer'
import {
  addConversation,
  addMessageToActiveConversation,
  getActiveConversation,
  getActiveConversee,
} from '../../store/chat'
import { useDispatch, useSelector } from 'react-redux'
import { getSocket } from '../../store/sockets'
import Header from './Header'
import Messages from './Messages'
import { addFriendEntry, getLoggedInUser } from '../../store/users'
import {
  useAcceptFriendRequestMutation,
  useCancelPendingCallForConversationMutation,
  useSaveMessageMutation,
  useSendFriendRequestMutation,
} from '../../generated/graphql'
import ChatControlsAndSearch from './ChatControlsAndSearch'
import { setFriendFlagOnProfile } from '../../store/profiles'

function Chat() {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)

  const [inputMessage, setInputMessage] = useState('')
  const socket = useSelector(getSocket)

  const activeConversation = useSelector(getActiveConversation)
  const profile = useSelector(getActiveConversee)
  const [, saveMessage] = useSaveMessageMutation()

  const [, sendFriendRequest] = useSendFriendRequestMutation()
  const [, acceptFriendRequest] = useAcceptFriendRequestMutation()
  const [socketError, setSocketError] = useState(false)

  const toast = useToast()

  useEffect(() => {
    if (socket) {
      socket.on(
        'friendship-request-accepted',
        ({ content, from, fromUsername, to }) => {
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
        'send-friend-request',
        ({ content, from, fromUsername, to }) => {
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

      return () => {
        // setOnline('loading')
        socket.off('send-friend-request')
        socket.off('friendship-request-accepted')
      }
    }
  }, [socket])

  const handleSendMessage = async () => {
    if (!inputMessage.trim().length) {
      return
    }

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
      conversationUuid: activeConversation.uuid,
    })

    dispatch(
      addMessageToActiveConversation({
        message: data,
        loggedInUser,
        from: 'me',
        conversationUuid: activeConversation.uuid,
      })
    )

    await saveMessage({
      message: data,
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
          className="flex-col p-0"
          overflowY="scroll"
          style={{ flex: '0.9' }}
        >
          <Header></Header>
          <Messages />
        </Flex>
      ) : null}

      {/*<Flex className="flex-col" style={{ flex: '0.95' }}>*/}
      {/*  fewfewf*/}
      {/*</Flex>*/}
      {/*</Flex>*/}
      {activeConversation ? (
        <Flex w="100%" flexDir="column" className="" style={{ flex: '0.05' }}>
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
