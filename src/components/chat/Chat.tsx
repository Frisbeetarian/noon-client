import { Wrap, Flex, Divider, CloseButton, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Messages from './Messages'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser } from '../../store/users'
import { getSocket } from '../../store/sockets'
import { getActiveConversee } from '../../store/chat'

export default function Chat() {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const socket = useSelector(getSocket)
  const activeConversee = useSelector(getActiveConversee)

  const [messages, setMessages] = useState([
    { from: 'computer', text: 'Hi, My Name is HoneyChat' },
    { from: 'me', text: 'Hey there' },
    { from: 'me', text: 'Myself Ferin Patel' },
    {
      from: 'computer',
      text: "Nice to meet you. You can send me message and i'll reply you with same message.",
    },
  ])

  const [inputMessage, setInputMessage] = useState('')

  const handleSendMessage = () => {
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

  return (
    <Flex className="border border-black absolute bottom-16 z-40 md:w-2/4 xs:w-1/4">
      <Flex w="100%" h="70vh" flexDir="column">
        <Flex w="100%" h="90.5%" className="bg-green-500">
          <Messages messages={messages} />
        </Flex>

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
      </Flex>
    </Flex>
  )
}
