import { useDisclosure } from '@chakra-ui/hooks'
import React, { useCallback, useEffect, useRef, useState } from 'react'
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
  addMessageToConversationByConversationUuid,
  getActiveConversation,
  getActiveConversationSet,
  getActiveConversee,
  getConversations,
  getSortedConversations,
  setActiveConversation,
  setActiveConversationSet,
  setActiveConversee,
  setConversations,
} from '../store/chat'

import { getLoggedInUser } from '../store/users'

import {
  useGetConversationForLoggedInUserQuery,
  useSaveMessageMutation,
  useUpdateUnreadMessagesForConversationMutation,
} from '../generated/graphql'
import Header from './chat/Header'
import { setChatComponentState } from '../store/ui'

export default function ChatSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = React.useRef()
  const [startDate, setStartDate] = useState(new Date())

  const [
    {
      data: fetchedConversations,
      error: conversationsError,
      fetching: conversationsFetching,
    },
  ] = useGetConversationForLoggedInUserQuery()

  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)

  const [profile, setProfile] = useState()
  const socket = useSelector(getSocket)
  let activeConversation = useSelector(getActiveConversation)
  const activeConversee = useSelector(getActiveConversee)
  const getConversationsFromStore = useSelector(getSortedConversations)
  const activeConversationSet = useSelector(getActiveConversationSet)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [, saveMessage] = useSaveMessageMutation()

  const [, updateUnreadMessagesForConversation] =
    useUpdateUnreadMessagesForConversationMutation()

  console.log('fetched conversations:', fetchedConversations)

  // useEffect(() => {
  // activeConversation = activeConversation
  // dispatch(setActiveConversation(activeConversation))

  // if (activeConversation === null) {
  //   dispatch(setActiveConversation(null))
  // }

  // return () => {
  //   dispatch(setActiveConversation(null))
  // }
  // }, [activeConversation])

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
        conversationUuid: activeConversation.uuid,
      })
    )

    await saveMessage({
      message: data,
      conversationUuid: activeConversation.uuid,
      to: activeConversee.uuid,
    })
  }

  const [height, setHeight] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    if (isOpen) {
      dispatch(setChatComponentState('open'))
    } else {
      dispatch(setChatComponentState('closed'))
    }

    setTimeout(() => {
      if (ref.current) setHeight(ref.current.clientHeight)
    }, 100)
  }, [isOpen])

  useEffect(() => {
    if (socket) {
      socket.on(
        'private-chat-message',
        ({ content, from, fromUsername, to, message, conversationUuid }) => {
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
            })
          )
        }
      )

      return () => {
        socket.off('private-chat-message')
      }
    }
  }, [socket, activeConversationSet])

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
  }, [fetchedConversations])

  function setActiveConverseeFunction(profile, conversation) {
    dispatch(setActiveConversationSet(true))
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
          <DrawerCloseButton
            className="bg-white"
            onClick={() => {
              dispatch(setActiveConversation(null))
            }}
          />

          <DrawerHeader
            className="text-white bg-neutral"
            borderBottomWidth="1px"
          >
            Chat
          </DrawerHeader>

          <DrawerBody
            id="body-container"
            className="text-white bg-neutral justify-between"
            ref={ref}
          >
            {/*{height}*/}
            {/*<Flex className="border border-black absolute bottom-16 z-40 md:w-2/4 xs:w-1/4">*/}
            {/*<Flex w="100%" h="90vh" flexDir="column">*/}
            <Flex className="w-100% h-100%" style={{ height: height - 50 }}>
              <Flex
                w="15%"
                className="border-r-info border-r-base-100 flex-col overflow-y-auto h-100%"
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
                            key={conversation.uuid}
                            className="items-center mb-2 p-3 border-b border-b-base-300 border-b-amber-100 cursor-pointer"
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
                              {conversation.unreadMessages &&
                              conversation.unreadMessages !== 0 &&
                              conversation.profileThatHasUnreadMessages ===
                                loggedInUser.user.profile.uuid ? (
                                <AvatarBadge boxSize="1.25em" bg="red.500">
                                  <p className="text-xs">
                                    {conversation.unreadMessages}
                                  </p>
                                </AvatarBadge>
                              ) : null}
                            </Avatar>

                            <p>{conversation.conversee.username}</p>
                          </Flex>
                          // </Tooltip>
                        )
                    )
                  : null}
              </Flex>

              <Flex w="85%" className="">
                {profile && activeConversation ? (
                  <Flex className="flex-col ml-5" w="100%">
                    <Header></Header>

                    <Messages
                    // conversation={activeConversation}
                    />
                  </Flex>
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
