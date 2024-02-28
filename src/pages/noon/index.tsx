// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head'
import { useDisclosure, useToast } from '@chakra-ui/react'

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
  setPasswordPromptSubmitted,
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
  const [localFriendRequests, setLocalFriendRequests] = useState(null)

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
      console.log('logged in user:', loggedInUser)

      loggedInUser.user.profile.friendshipRequests.forEach((friendRequest) => {
        if (!friendRequest.reverse) return
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
    </div>
  )
}

export default withAxios(Noon)
