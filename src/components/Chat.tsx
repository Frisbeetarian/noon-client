// @ts-nocheck
import React, { useEffect, useState } from 'react'
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import Footer from './Footer'

import {
  addMessageToActiveConversation,
  getActiveConversation,
  getActiveConversee,
} from '../store/chat'

import { getVideoFrameOpenState } from '../store/video'
import { useDispatch, useSelector } from 'react-redux'
import { getSocketId } from '../store/sockets'

import Header from './Header'
import Messages from './Messages'

import { getLoggedInUser } from '../store/users'

// import {
//   useSaveMessageMutation,
//   useSaveGroupMessageMutation,
// } from '../generated/graphql'

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
import withAxios from '../utils/withAxios'
import AppButton from './AppComponents/AppButton'

function Chat({ axios }) {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const isCreateGroupOpen = useSelector(getCreateGroupComponent)
  const isMobile = useSelector(getIsMobile)
  const [innerHeight, setInnerHeight] = useState(0)

  const [inputMessage, setInputMessage] = useState('')
  const socket = useSelector(getSocketId)

  const activeConversation = useSelector(getActiveConversation)
  const videoFrameOpenState = useSelector(getVideoFrameOpenState)

  const profile = useSelector(getActiveConversee)
  const [isOpen, setIsOpen] = useState(false)

  // const [
  //   saveMessage,
  //   // { loading: saveMessageLoading }
  // ] = useSaveMessageMutation()

  // const [
  //   saveGroupMessage,
  //   // { loading: saveGroupLoading }
  // ] = useSaveGroupMessageMutation()

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

    // const message = await saveGroupMessage({
    //   variables: {
    //     message: data,
    //     type: 'text',
    //     src: '',
    //     conversationUuid: activeConversation.uuid,
    //   },
    // })

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

    const message = await axios.post('/api/messages', {
      message: data,
      type: 'text',
      src: '',
      conversationUuid: activeConversation.uuid,
      recipientUuid: profile.uuid,
      recipientUsername: profile.username,
    })

    // const message = await saveMessage({
    //   variables: {
    //     message: data,
    //     type: 'text',
    //     src: '',
    //     conversationUuid: activeConversation.uuid,
    //     to: profile.uuid,
    //   },
    // })

    // emitPrivateChatMessage({
    //   loggedInUser,
    //   profile,
    //   response: message,
    //   activeConversation,
    //   socket,
    // })

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
        'flex-col bg-red-500 text-white box-content relative z-50 md:z-0 chat-container'
      }
      style={{
        flex: isMobile ? '1' : '0.75',
        height: innerHeight,
        overflow: 'hidden',
      }}
    >
      <div
        className="flex items-center justify-center border-b border-black box-content"
        style={{ height: isMobile ? '10vh' : '5vh' }}
      >
        <ChatControlsAndSearch />
      </div>

      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="bg-black p-5 text-red-500">
            Welcome to NOON
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="bg-black p-5 text-white">
            <p>
              NOON attempts to be a whitelabel, open source, free and secure
              communication platform for security and privacy minded individuals
              and organizations. This is a very early build and a lot of the
              features are still being reworked. An initial working version was
              constructed with Graphql but ive decided that it just wasnt worth
              the overhead and am currently refactoring to a REST client.
              Searching, befriending and private one on one chatting currently
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              "works". Would highly appreciate it if you could drop me bug
              reports on mohamad.sleimanhaidar@gmail.com if you encounter any
              issues and many thanks!{' '}
            </p>
          </ModalBody>
          <ModalFooter className="bg-black">
            <AppButton
              mr={3}
              onClick={() => {
                setIsOpen(false)
              }}
            >
              Close
            </AppButton>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/*{isCreateGroupOpen ? (*/}
      {/*  <Flex*/}
      {/*    className="flex-col p-0 box-content"*/}
      {/*    style={{*/}
      {/*      height: isMobile ? '77.5vh' : '90vh',*/}
      {/*      transition: 'all .5s',*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <CreateGroup />*/}
      {/*  </Flex>*/}
      {/*) : null}*/}

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

export default withAxios(Chat)
