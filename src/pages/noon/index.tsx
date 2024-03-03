// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'

import {
  addFriendEntry,
  getLoggedInUser,
  removeFriendRequestEntry,
  setFriendsPublicKey,
} from '../../store/users'

import { addConversation } from '../../store/chat'

import Chat from '../../components/Chat'
import { withAxios } from '../../utils/withAxios'
import {
  getCreateGroupActive,
  getIsConversationOpen,
  getIsMobile,
  getPasswordPromptSubmitted,
} from '../../store/ui'
import SocketControls from '../../components/SocketIo/SocketControls'
import CreateGroupSidebar from '../../components/CreateGroupSidebar'
import SocketConnectionProvider from '../../providers/SocketConnectionProvider'
import {
  setFriendFlagOnProfile,
  unsetHasFriendshipRequestFromLoggedInProfile,
} from '../../store/profiles'
import Sidebar from '../../components/Sidebar'
import {
  acceptFriendRequest,
  rejectFriendRequest,
} from '../../utils/friendRequestActions'
import useAppAlert from '../../hooks/useAppAlert'
import PasswordPromptModal from '../../components/PasswordPromptModal'
import { useValidatePasswordMutation } from '../../store/api/usersApiSlice'
import KeyManagement from '../../utils/KeyManagement'
import AppButton from '../../components/AppComponents/AppButton'

const meta = {
  title: 'Noon – Open source, secure, free communication platform.',
}

function Noon({ axios }) {
  const dispatch = useDispatch()
  const [mounted, setMounted] = useState(false)
  const isMobile = useSelector(getIsMobile)
  const isConversationOpen = useSelector(getIsConversationOpen)
  const createGroupActive = useSelector(getCreateGroupActive)
  const loggedInUser = useSelector(getLoggedInUser)
  const toast = useToast()
  const showAppAlert = useAppAlert()
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false })
  const [validatePassword, { isLoading, isSuccess, isError }] =
    useValidatePasswordMutation()
  const {
    isOpen: isWelcomeModalOpen,
    onOpen: onWelcomeModelOpen,
    onClose: onWelcomeModalClose,
  } = useDisclosure({ defaultIsOpen: false })
  const getPromptSubmitted = useSelector(getPasswordPromptSubmitted)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (loggedInUser.user?.profile?.friends) {
      fetchFriendsPublicKey()
    }

    try {
      KeyManagement.getMasterKey()
      onClose()
    } catch (error) {
      onOpen()
    }
  }, [loggedInUser.user])

  useEffect(() => {
    if (getPromptSubmitted) {
      onWelcomeModelOpen()
    }
  }, [getPromptSubmitted])

  const fetchFriendsPublicKey = async () => {
    if (!loggedInUser.user?.profile?.friends) return

    try {
      const friendsPublicKey = await axios.get(`api/users/publicKeys`)
      if (
        friendsPublicKey &&
        friendsPublicKey.data &&
        friendsPublicKey.data.length !== 0
      ) {
        dispatch(setFriendsPublicKey(friendsPublicKey.data))
      }
    } catch (error) {
      console.error('Error fetching friends public keys:', error.message)
    }
  }

  const handleAcceptFriendRequest = (friendRequest) => {
    acceptFriendRequest({
      axios,
      dispatch,
      friendRequest,
      loggedInUser,
      setFriendFlagOnProfile,
      removeFriendRequestEntry,
      addFriendEntry,
      addConversation,
      toastId: friendRequest.uuid + 'friend-request' + loggedInUser.user.uuid,
      toast,
    })
  }

  const handleRejectFriendRequest = (friendRequest) => {
    rejectFriendRequest({
      axios,
      dispatch,
      friendRequest,
      loggedInUser,
      unsetHasFriendshipRequestFromLoggedInProfile,
      removeFriendRequestEntry,
      toastId: friendRequest.uuid + 'friend-request' + loggedInUser.user.uuid,
      toast,
    })
  }

  const handlePasswordSubmit = async (password) => {
    try {
      const response = await validatePassword({ password }).unwrap()
      if (response.valid) {
        const encryptedKEKDetails =
          await KeyManagement.fetchEncryptedKEKDetails(loggedInUser.user.uuid)
        if (!encryptedKEKDetails) {
          throw new Error('Encrypted KEK details not found.')
        }

        await KeyManagement.decryptAndSetMasterKey(
          {
            encryptedMasterKey: KeyManagement.base64ToArrayBuffer(
              encryptedKEKDetails.encryptedMasterKey
            ),
            iv: KeyManagement.base64ToArrayBuffer(encryptedKEKDetails.iv),
            salt: KeyManagement.base64ToArrayBuffer(encryptedKEKDetails.salt),
          },
          password
        )

        onClose()
      }
    } catch (error) {
      console.error('Error decrypting KEK or validating password:', error)
    }
  }

  useEffect(() => {
    if (
      loggedInUser &&
      loggedInUser.user.profile &&
      loggedInUser.user?.profile?.friendshipRequests &&
      loggedInUser.user?.profile?.friendshipRequests.length !== 0
    ) {
      loggedInUser.user.profile.friendshipRequests.forEach((friendRequest) => {
        if (!friendRequest.reverse || friendRequest.isNew) return

        showAppAlert({
          id: friendRequest.uuid + 'friend-request',
          title: `${friendRequest.username} sent you a friend request.`,
          status: 'info',
          duration: null,
          onAccept: () => handleAcceptFriendRequest(friendRequest),
          onReject: () => handleRejectFriendRequest(friendRequest),
          customRender: true,
        })
      })
    }
  }, [loggedInUser.user.profile?.friendshipRequests])

  if (!mounted) return null

  return (
    <div className="flex" style={{ overflow: 'hidden' }}>
      <Head>
        <title>{meta.title}</title>
      </Head>

      {mounted && loggedInUser.user?.profile ? (
        <SocketConnectionProvider>
          <Sidebar />
          {!isMobile && <Chat />}
          {isMobile && isConversationOpen && <Chat />}
          {!isMobile && <SocketControls />}
          {createGroupActive && <CreateGroupSidebar />}
        </SocketConnectionProvider>
      ) : null}

      <PasswordPromptModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handlePasswordSubmit}
        isLoading={isLoading}
      />

      {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
      <Modal isOpen={isWelcomeModalOpen} onClose={() => {}}>
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
                onWelcomeModalClose()
              }}
            >
              Close
            </AppButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default withAxios(Noon)
