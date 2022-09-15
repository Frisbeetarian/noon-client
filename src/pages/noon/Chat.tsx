import React, { useState } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import Footer from './Footer'
import {
  addMessageToActiveConversation,
  getActiveConversation,
  getActiveConversee,
} from '../../store/chat'
import { useDispatch, useSelector } from 'react-redux'
import { getSocket } from '../../store/sockets'
import SocketConnector from '../../components/SocketIo/SocketConnector'
import Header from './Header'
import Messages from './Messages'
import { getLoggedInUser } from '../../store/users'
import { useSaveMessageMutation } from '../../generated/graphql'
import ChatControlsAndSearch from './ChatControlsAndSearch'

function Chat() {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)

  const [inputMessage, setInputMessage] = useState('')
  const socket = useSelector(getSocket)

  const activeConversation = useSelector(getActiveConversation)
  const profile = useSelector(getActiveConversee)
  const [, saveMessage] = useSaveMessageMutation()

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
      className="flex-col bg-gray-700 text-white box-content"
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
