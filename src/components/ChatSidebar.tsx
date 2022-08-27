import { useDisclosure } from '@chakra-ui/hooks'
import React, { useCallback, useEffect, useState } from 'react'
import { AddIcon, ChatIcon } from '@chakra-ui/icons'
import {
  Avatar,
  AvatarBadge,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
} from '@chakra-ui/react'

import Messages from './chat/Messages'
import Footer from './chat/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getSocket } from '../store/sockets'
import {
  addMessageToActiveConversation,
  getActiveConversation,
  getActiveConversee,
  getConversations,
  setActiveConversation,
  setActiveConversee,
  setConversations,
} from '../store/chat'
import { getLoggedInUser } from '../store/users'
import {
  useGetConversationForLoggedInUserQuery,
  useGetConversationProfileForLoggedInUserQuery,
  useGetConversationsByProfileUuidQuery,
  useGetProfilesQuery,
  useSaveMessageMutation,
} from '../generated/graphql'
import { addProfiles } from '../store/profiles'

export default function ChatSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = React.useRef()
  const [startDate, setStartDate] = useState(new Date())

  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversation = useSelector(getActiveConversation)

  const [profile, setProfile] = useState()
  const socket = useSelector(getSocket)
  const activeConversee = useSelector(getActiveConversee)
  const getConversationsFromStore = useSelector(getConversations)

  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [, saveMessage] = useSaveMessageMutation()

  const [
    {
      data: fetchedConversations,
      error: conversationsError,
      fetching: conversationsFetching,
    },
  ] = useGetConversationForLoggedInUserQuery()

  const handleSendMessage = async () => {
    if (!inputMessage.trim().length) {
      return
    }

    const data = inputMessage
    setMessages((old) => [...old, { from: 'me', text: data }])
    setInputMessage('')

    socket.emit('private-chat-message', {
      content: loggedInUser.user?.profile?.username + ' sent you a message.',
      from: loggedInUser.user?.profile?.uuid,
      fromUsername: loggedInUser.user?.profile?.username,
      to: activeConversee.uuid,
      toUsername: activeConversee.username,
      message: data,
      conversationUuid: activeConversation.uuid,
    })

    dispatch(
      addMessageToActiveConversation({
        message: data,
        loggedInUser,
        from: 'me',
      })
    )
    await saveMessage({
      message: data,
      conversationUuid: activeConversation.uuid,
    })
  }

  useEffect(() => {
    if (socket) {
      socket.on(
        'private-chat-message',
        ({ content, from, fromUsername, to, message }) => {
          if (!message.trim().length) {
            return
          }
          console.log('RECEIVED MESSAGES:', message)
          const data = message
          dispatch(
            addMessageToActiveConversation({
              message: data,
              loggedInUser,
              from: 'computer',
            })
          )

          // setMessages((old) => [...old, { from: 'computer', text: data }])
          setInputMessage('')
        }
      )

      return () => {
        socket.off('private-chat-message')
      }
    }
  }, [socket])

  useEffect(() => {
    if (fetchedConversations?.getConversationForLoggedInUser) {
      dispatch(
        setConversations({
          conversationsToSend:
            fetchedConversations?.getConversationForLoggedInUser,
          loggedInProfileUuid: loggedInUser?.user?.profile?.uuid,
        })
      )
    }
    // if (activeConversation) {
    //   let messages = []
    //
    //   activeConversation.messages.forEach((message) => {
    //     messages.push({
    //       from:
    //         message.sender.uuid === loggedInUser.user.profile.uuid
    //           ? 'me'
    //           : 'computer',
    //       text: message.content,
    //       uuid: message.uuid,
    //     })
    //   })
    //
    //   setMessages(messages)
    // }
  }, [fetchedConversations])

  function setActiveConverseeFunction(profile, conversation) {
    dispatch(setActiveConversee(profile))
    dispatch(
      setActiveConversation({
        conversation: conversation,
        loggedInProfileUuid: loggedInUser?.user?.profile?.uuid,
      })
    )
  }

  if (!loggedInUser) {
    return (
      <div>
        <div>query failed for some reason</div>
      </div>
    )
  }

  return (
    <>
      <Flex className="justify-between w-full" onClick={onOpen}>
        <p className="text-info">Chat</p>
        <ChatIcon className="mr-3 mt-1" />
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="left"
        initialFocusRef={firstField}
        onClose={onClose}
        size="xl"
        className="text-white bg-neutral"
      >
        <DrawerOverlay />

        <DrawerContent className="text-white">
          <DrawerCloseButton className="bg-white" />
          <DrawerHeader
            className="text-white bg-neutral"
            borderBottomWidth="1px"
          >
            Chat
          </DrawerHeader>

          <DrawerBody className="text-white bg-neutral justify-between">
            {/*<Flex className="border border-black absolute bottom-16 z-40 md:w-2/4 xs:w-1/4">*/}
            {/*<Flex w="100%" h="90vh" flexDir="column">*/}
            <Flex className="h-100% bg-blue-500 w-100%">
              <Flex
                w="15%"
                className="border-r-info border-r-base-100 bg-red-500 flex-col"
              >
                {getConversationsFromStore
                  ? [...Object.values(getConversationsFromStore)].map(
                      (conversation, i) =>
                        !conversation ? null : (
                          // <Tooltip
                          //   label={conversation.username}
                          //   aria-label={conversation.username}
                          //   placement="bottom"
                          // >
                          <Flex
                            className="items-center bg-green-500 mb-2 p-3 border-b border-b-base-300 border-b-amber-100 cursor-pointer"
                            onClick={() => {
                              setActiveConverseeFunction(
                                conversation.conversee,
                                conversation
                              )
                              setProfile(conversation.conversee)
                            }}
                          >
                            <Avatar
                              key={i}
                              name={conversation.conversee.username}
                              size="sm"
                              className="mr-2"
                            >
                              <AvatarBadge boxSize="1.25em" bg="green.500" />
                            </Avatar>

                            <p>{conversation.conversee.username}</p>
                          </Flex>
                          // </Tooltip>
                        )
                    )
                  : null}
              </Flex>

              <Flex w="85%" h="70vh" className="bg-green-500">
                {profile && activeConversation ? (
                  <Messages
                  // conversation={activeConversation}
                  />
                ) : null}
              </Flex>
            </Flex>
          </DrawerBody>

          <DrawerFooter className="bg-neutral" borderTopWidth="1px">
            <Flex w="100%" flexDir="column" className="">
              <Footer
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                handleSendMessage={handleSendMessage}
              />
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
