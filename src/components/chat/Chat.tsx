import { Wrap, Flex, Divider } from '@chakra-ui/react'
import React, { useState } from 'react'
import Header from './Header'
import Messages from './Messages'
import Footer from './Footer'

export default function Chat() {
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

    setTimeout(() => {
      setMessages((old) => [...old, { from: 'computer', text: data }])
    }, 1000)
  }

  return (
    <Flex className="border border-black absolute bottom-16 right-0 z-40 w-2/4">
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
