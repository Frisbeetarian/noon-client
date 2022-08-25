import { useDisclosure } from '@chakra-ui/hooks'
import React, { useCallback, useEffect, useState } from 'react'
import { AddIcon, ChatIcon } from '@chakra-ui/icons'
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Textarea,
  Tooltip,
} from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import Messages from './chat/Messages'
import Footer from './chat/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getSocket } from '../store/sockets'
import {
  getActiveConversation,
  getActiveConversee,
  setActiveConversation,
  setActiveConversee,
} from '../store/chat'
import { getLoggedInUser } from '../store/users'
import {
  useGetConversationsByProfileUuidQuery,
  useSaveMessageMutation,
} from '../generated/graphql'

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

  const [messages, setMessages] = useState([])

  const [inputMessage, setInputMessage] = useState('')
  const [, saveMessage] = useSaveMessageMutation()

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

    await saveMessage({
      message: data,
      conversationUuid: activeConversation.uuid,
    })

    // setTimeout(() => {
    //   setMessages((old) => [...old, { from: 'computer', text: data }])
    // }, 1000)
  }

  useEffect(() => {
    if (socket) {
      socket.on(
        'private-chat-message',
        ({ content, from, fromUsername, to, message }) => {
          console.log('received private message content:', content)
          console.log('received private message from:', from)

          console.log('received private message from:', fromUsername)
          console.log('received private message content:', to)
          console.log('received private message message:', message)

          if (!message.trim().length) {
            return
          }

          const data = message

          setMessages((old) => [...old, { from: 'computer', text: data }])
          setInputMessage('')
        }
      )

      return () => {
        socket.off('private-chat-message')
      }
    }
  }, [socket])

  useEffect(() => {
    if (activeConversation) {
      let messages = []

      activeConversation.messages.forEach((message) => {
        messages.push({
          from:
            message.sender.uuid === loggedInUser.user.profile.uuid
              ? 'me'
              : 'computer',
          text: message.content,
          uuid: messages.uuid,
        })
      })

      setMessages(messages)
    }
  }, [activeConversation])

  function setActiveConverseeFunction(profile) {
    dispatch(setActiveConversee(profile))
  }
  // useEffect(() => {
  //   console.log('logged in user:', loggedInUser.user)
  // }, [])

  if (!loggedInUser) {
    return (
      <div>
        <div>query failed for some reason</div>
      </div>
    )
  }

  return (
    <>
      {/*<Button*/}
      {/*  className="mb-4"*/}
      {/*  leftIcon={<AddIcon />}*/}
      {/*  colorScheme="red"*/}
      {/*  onClick={onOpen}*/}
      {/*>*/}
      {/*  Chat*/}
      {/*</Button>*/}
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

          <DrawerBody className="text-white bg-neutral justify-between ">
            {/*<Flex className="border border-black absolute bottom-16 z-40 md:w-2/4 xs:w-1/4">*/}
            {/*<Flex w="100%" h="90vh" flexDir="column">*/}
            <Flex className="h-100% bg-blue-500 w-100%">
              <Flex
                w="15%"
                className="border-r-info border-r-base-100 bg-red-500 flex-col"
              >
                {loggedInUser?.user?.friends
                  ? loggedInUser.user.friends.map((friend, i) =>
                      !friend ? null : (
                        // <Tooltip
                        //   label={friend.username}
                        //   aria-label={friend.username}
                        //   placement="bottom"
                        // >
                        <Flex
                          className="items-center bg-green-500 mb-2 p-3 border-b border-b-base-300 border-b-amber-100 cursor-pointer"
                          onClick={() => {
                            setActiveConverseeFunction(friend)
                            setProfile(friend)
                          }}
                        >
                          <Avatar
                            key={i}
                            name={friend.username}
                            size="sm"
                            className="mr-2"
                          >
                            <AvatarBadge boxSize="1.25em" bg="green.500" />
                          </Avatar>
                          <p>{friend.username}</p>
                        </Flex>
                        // </Tooltip>
                      )
                    )
                  : null}
              </Flex>

              <Flex w="85%" h="70vh" className="bg-green-500">
                {/*{profile ? <Conversation profile={profile} /> : null}*/}
                {profile ? (
                  <Messages messages={messages} profile={profile} />
                ) : null}
              </Flex>
            </Flex>
            {/*</Flex>*/}
            {/*</Flex>*/}
          </DrawerBody>

          <DrawerFooter className="bg-neutral" borderTopWidth="1px">
            <Flex w="100%" flexDir="column" className="">
              {/*<Header />*/}
              {/*<Divider />*/}
              {/*<Divider />*/}
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
