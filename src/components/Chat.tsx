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
  useToast,
} from '@chakra-ui/react'
import Footer from './Footer'

import {
  addMessageToActiveConversation,
  getActiveConversation,
  getActiveConversee,
} from '../store/chat'

import { getVideoFrameOpenState } from '../store/video'
import { useDispatch, useSelector } from 'react-redux'

import Header from './Header'
import Messages from './Messages'

import { getLoggedInUser, getFriendPublicKeyByUuid } from '../store/users'

import { getIsMobile } from '../store/ui'

import ChatControlsAndSearch from './ChatControlsAndSearch'

import Video from './Video'
import withAxios from '../utils/withAxios'
import AppButton from './AppComponents/AppButton'
import MessageManagement from '../utils/MessageManagement'

function Chat({ axios }) {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const isMobile = useSelector(getIsMobile)
  const [innerHeight, setInnerHeight] = useState(0)

  const [inputMessage, setInputMessage] = useState('')

  const activeConversation = useSelector(getActiveConversation)
  const videoFrameOpenState = useSelector(getVideoFrameOpenState)

  const profile = useSelector(getActiveConversee)
  const [isOpen, setIsOpen] = useState(false)
  const toast = useToast()
  const friendPublicKey = useSelector((state) =>
    getFriendPublicKeyByUuid(state, profile?.uuid)
  )

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

    const publicKeys = activeConversation.profiles
      .map((profile) => {
        return {
          uuid: profile.uuid,
          username: profile.username,
          publicKey: profile.publicKey,
        }
      })
      .filter((pk) => pk !== null)

    const encryptedPayload = await MessageManagement.encryptMessage(
      publicKeys,
      inputMessage
    )

    setInputMessage('')
    await axios
      .post('/api/messages/groupMessages', {
        message: encryptedPayload.encryptedMessage,
        type: 'text',
        src: '',
        conversationUuid: activeConversation.uuid,
        encryptedKeys: encryptedPayload.encryptedKeys,
        participants: activeConversation.profiles.map(
          (profile) => profile.uuid
        ),
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            addMessageToActiveConversation({
              message: {
                uuid: response.data?.uuid as string,
                content: encryptedPayload.encryptedMessage as string,
                sender: {
                  uuid: loggedInUser?.user?.profile?.uuid,
                  username: loggedInUser?.user?.profile?.username,
                },
                from: 'me',
                type: 'text',
                src: '',
                deleted: false,
                conversationUuid: activeConversation.uuid,
                encryptedKey: response.data.encryptedKey,
                updatedAt: new Date().toISOString(),
                createdAt: new Date().toISOString(),
              },
              loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
            })
          )
        }
      })
      .catch((error) => {
        if (error.response.status !== 429) {
          toast({
            title: `Error sending message.`,
            position: 'bottom-right',
            isClosable: true,
            status: 'error',
            duration: 5000,
          })
        }
      })
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim().length) {
      return
    }

    const publicKeys = new Set()
    publicKeys.add({
      uuid: loggedInUser.user.profile.uuid,
      publicKey: loggedInUser.user.publicKey,
    })

    publicKeys.add({
      uuid: profile.uuid,
      publicKey: friendPublicKey,
    })

    const encryptedPayload = await MessageManagement.encryptMessage(
      publicKeys,
      inputMessage
    )

    setInputMessage('')

    await axios
      .post('/api/messages', {
        message: encryptedPayload.encryptedMessage,
        type: 'text',
        src: '',
        conversationUuid: activeConversation.uuid,
        recipientUuid: profile.uuid,
        recipientUsername: profile.username,
        encryptedKeys: encryptedPayload.encryptedKeys,
      })
      .then(function (response) {
        if (response.status === 200) {
          dispatch(
            addMessageToActiveConversation({
              message: {
                uuid: response.data.uuid as string,
                content: encryptedPayload.encryptedMessage as string,
                sender: {
                  uuid: loggedInUser?.user?.profile?.uuid,
                  username: loggedInUser?.user?.profile?.username,
                },
                from: 'me',
                type: 'text',
                src: '',
                deleted: false,
                conversationUuid: activeConversation.uuid,
                encryptedKey: response.data.encryptedKey,
                updatedAt: new Date().toISOString(),
                createdAt: new Date().toISOString(),
              },
              loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
            })
          )
        }
      })
      .catch(function (error) {
        if (error?.response?.status !== 429) {
          toast({
            title: `Error sending message.`,
            position: 'bottom-right',
            isClosable: true,
            status: 'error',
            duration: 5000,
          })
        }
      })
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

      {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
      <Modal isOpen={isOpen} onClose={() => {}}>
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
            // <FileUpload>
            <Messages />
          ) : (
            // </FileUpload>
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
            // <FileUpload>
            <Messages />
          ) : (
            // </FileUpload>
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
