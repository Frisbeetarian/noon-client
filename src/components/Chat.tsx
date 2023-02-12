import React, { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import Footer from './Footer'

import {
  addMessageToActiveConversation,
  getActiveConversation,
  getActiveConversee,
} from '../store/chat'

import { getVideoFrameOpenState } from '../store/video'
import { useDispatch, useSelector } from 'react-redux'
import { getSocket } from '../store/sockets'

import Header from './Header'
import Messages from './Messages'

import { getLoggedInUser } from '../store/users'

import {
  useSaveMessageMutation,
  useSaveGroupMessageMutation,
} from '../generated/graphql'

import {
  getCreateGroupComponent,
  // getChatContainerHeight,
  getIsMobile,
  // getIsSearchActive,
} from '../store/ui'

import ChatControlsAndSearch from './ChatControlsAndSearch'

import { FileUpload } from './FileUpload'
import CreateGroup from './CreateGroup'
import Video from './Video'
import { emitPrivateChatMessage } from '../utils/SocketEmits'

function Chat() {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const isCreateGroupOpen = useSelector(getCreateGroupComponent)
  const isMobile = useSelector(getIsMobile)
  const [innerHeight, setInnerHeight] = useState(0)

  const [inputMessage, setInputMessage] = useState('')
  const socket = useSelector(getSocket)

  const activeConversation = useSelector(getActiveConversation)
  const videoFrameOpenState = useSelector(getVideoFrameOpenState)
  // const chatContainerHeight = useSelector(getChatContainerHeight)
  // const searchActive = useSelector(getIsSearchActive)

  const profile = useSelector(getActiveConversee)

  const [
    saveMessage,
    // { loading: saveMessageLoading }
  ] = useSaveMessageMutation()

  const [
    saveGroupMessage,
    // { loading: saveGroupLoading }
  ] = useSaveGroupMessageMutation()

  useEffect(() => {
    setInnerHeight(window.innerHeight)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', () => {
      setInnerHeight(window.innerHeight)
    })

    return () => {
      window.removeEventListener('resize', () => {
        console.log('removed')
      })
    }
  })

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
        emitPrivateChatMessage({
          loggedInUser,
          profile,
          response: message,
          activeConversation,
          socket,
        })
        //
        // socket.emit('private-chat-message', {
        //   content:
        //     loggedInUser.user?.profile?.username + ' sent you a message.',
        //   from: loggedInUser.user?.profile?.uuid,
        //   fromUsername: loggedInUser.user?.profile?.username,
        //   to: profile.uuid,
        //   toUsername: profile.username,
        //   messageUuid: message.data?.saveGroupMessage?.uuid,
        //   message: data,
        //   type: 'text',
        //   src: '',
        //   conversationUuid: activeConversation.uuid,
        // })
      }
    })

    dispatch(
      addMessageToActiveConversation({
        message: {
          uuid: message.data?.saveGroupMessage?.uuid as string,
          content: data,
          sender: {
            uuid: loggedInUser?.user?.profile?.uuid,
            username: loggedInUser?.user?.profile?.username,
          },
          from: 'me',
          type: 'text',
          src: '',
          deleted: false,
          conversationUuid: activeConversation.uuid,
          updatedAt: new Date().toString(),
          createdAt: new Date().toString(),
        },
        loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
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

    emitPrivateChatMessage({
      loggedInUser,
      profile,
      response: message,
      activeConversation,
      socket,
    })

    // socket.emit('private-chat-message', {
    //   content: loggedInUser.user?.profile?.username + ' sent you a message.',
    //   from: loggedInUser.user?.profile?.uuid,
    //   fromUsername: loggedInUser.user?.profile?.username,
    //   to: profile.uuid,
    //   toUsername: profile.username,
    //   messageUuid: message.data?.saveMessage?.uuid,
    //   message: data,
    //   type: 'text',
    //   src: '',
    //   conversationUuid: activeConversation.uuid,
    // })

    dispatch(
      addMessageToActiveConversation({
        message: {
          uuid: message.data?.saveMessage?.uuid as string,
          content: data as string,
          sender: {
            uuid: loggedInUser?.user?.profile?.uuid,
            username: loggedInUser?.user?.profile?.username,
          },
          from: 'me',
          type: 'text',
          src: '',
          deleted: false,
          conversationUuid: activeConversation.uuid,
          updatedAt: new Date().toString(),
          createdAt: new Date().toString(),
          // deleted: ,
        },
        loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
      })
    )
  }

  return (
    <Flex
      className={
        'flex-col bg-gray-700 text-white box-content relative z-50 md:z-0 chat-container'
      }
      style={{
        flex: isMobile ? '1' : '0.75',
        height: innerHeight,
        overflow: 'hidden',
      }}
    >
      <div
        className="flex items-center justify-center border-b box-content"
        style={{ height: isMobile ? '10vh' : '5vh' }}
      >
        <ChatControlsAndSearch />
      </div>

      {isCreateGroupOpen ? (
        <Flex
          className="flex-col p-0 box-content"
          style={{
            height: isMobile ? '77.5vh' : '90vh',
            transition: 'all .5s',
          }}
        >
          <CreateGroup />
        </Flex>
      ) : null}

      {activeConversation && activeConversation.type === 'group' ? (
        <Flex
          className="flex-col p-0 box-content"
          style={{
            height: isMobile ? '77.5vh' : '90vh',
            transition: 'all .5s',
          }}
        >
          {!isMobile && <Header></Header>}

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
          style={{
            height: isMobile ? '77.5vh' : '90vh',
            transition: 'all .5s',
          }}
        >
          {!isMobile && <Header></Header>}

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
          className="justify-center box-content"
          style={{ height: isMobile ? '12.5vh' : '7.5vh' }}
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
