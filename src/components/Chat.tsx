import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  Text,
} from '@chakra-ui/react'

import Footer from './Footer'

import {
  addMessageToActiveConversation,
  getActiveConversation,
  getActiveConversee,
} from '../store/chat'

import Header from './Header'
import Messages from './Messages'

import { getLoggedInUser, getFriendPublicKeyByUuid } from '../store/users'

import { getIsMobile, getPasswordPromptSubmitted } from '../store/ui'

import ChatControlsAndSearch from './ChatControlsAndSearch'

import Video from './Video'
import withAxios from '../utils/withAxios'
import AppButton from './AppComponents/AppButton'
import MessageManagement from '../utils/MessageManagement'
import { getVideoFrameOpenState } from '../store/video'

function Chat({ axios }) {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const isMobile = useSelector(getIsMobile)
  const [innerHeight, setInnerHeight] = useState(0)

  const [inputMessage, setInputMessage] = useState('')

  const activeConversation = useSelector(getActiveConversation)
  const videoFrameOpenState = useSelector(getVideoFrameOpenState)

  const profile = useSelector(getActiveConversee)
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false })

  const toast = useToast()
  const getPromptSubmitted = useSelector(getPasswordPromptSubmitted)
  const friendPublicKey = useSelector((state) =>
    getFriendPublicKeyByUuid(state, profile?.uuid)
  )

  useEffect(() => {
    setInnerHeight(window.innerHeight)
  }, [])

  useEffect(() => {
    if (getPromptSubmitted) {
      onOpen()
    }
  }, [getPromptSubmitted])

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
                // @ts-ignore
                conversationUuid: activeConversation.uuid,
                encryptedKey: response.data.encryptedKey,
                updatedAt: response.data.updatedAt,
                createdAt: response.data.createdAt,
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
                // @ts-ignore
                conversationUuid: activeConversation.uuid,
                encryptedKey: response.data.encryptedKey,
                updatedAt: response.data.updatedAt,
                createdAt: response.data.createdAt,
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
        'flex-col bg-red-500 text-white box-content relative z-50 md:z-0 chat-container bg-grid-small-black/[0.5]'
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
          <ModalHeader className="bg-red-500 p-5 text-white">
            Welcome to NOON(ن)
          </ModalHeader>

          <ModalBody className="bg-black p-5 text-white">
            <Text className="my-5">
              NOON(ن) is a whitelabel, open source, end to end encrypted, free
              communication platform for privacy and security minded
              individuals, organizations and communities.
            </Text>

            <Text className="my-5">
              Please visit &nbsp;
              <a
                href="https://muhammadsh.io/noon"
                target="_blank"
                className="border-b-2 border-red-500 hover:border-white transition-all duration-300 ease-in-out"
              >
                https://muhammadsh.io/noon
              </a>{' '}
              to go through the technical details behind the implementation and
              links to the repositories that make up the platform.
            </Text>

            <Text className="my-5">
              This is an early build and a lot of bugfixing and polishing is in
              progress, however the vast majority of the features are
              functional. Please keep in mind that as of{' '}
              <span className="text-red-400">27-02-2024</span>, images and voice
              notes are still not encrypted and are stored on the server as is.
            </Text>

            <Text className="my-5">
              Would highly appreciate it if you could drop me bug reports on
              mohamad.sleimanhaidar@gmail.com if you encounter any issues. Many
              thanks and stay safe!
            </Text>
          </ModalBody>
          <ModalFooter className="bg-black">
            <AppButton
              mr={3}
              onClick={() => {
                // setIsOpen(false)
                onClose()
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
          style={{ height: isMobile ? '12.5vh' : '7.7vh' }}
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
