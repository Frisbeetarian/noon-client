// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head'
import { useToast } from '@chakra-ui/react'

import {
  addFriendEntry,
  getLoggedInUser,
  removeFriendRequestEntry,
} from '../../store/users'

import { addConversation } from '../../store/chat'

import Chat from '../../components/Chat'
import { withAxios } from '../../utils/withAxios'
import {
  getCreateGroupActive,
  getIsConversationOpen,
  getIsMobile,
} from '../../store/ui'
import SocketControls from '../../components/SocketIo/SocketControls'
import CreateGroupSidebar from '../../components/CreateGroupSidebar'
import SocketConnectionProvider from '../../providers/SocketConnectionProvider'
import {
  cancelFriendshipRequestSentOnProfile,
  setFriendFlagOnProfile,
  unsetHasFriendshipRequestFromLoggedInProfile,
} from '../../store/profiles'
import Sidebar from '../../components/Sidebar'
import {
  acceptFriendRequest,
  rejectFriendRequest,
} from '../../utils/friendRequestActions'
import useAppAlert from '../../hooks/useAppAlert'

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

  useEffect(() => {
    setMounted(true)
  }, [])

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

  useEffect(() => {
    if (
      loggedInUser &&
      loggedInUser.user.profile &&
      loggedInUser.user?.profile?.friendshipRequests &&
      loggedInUser.user?.profile?.friendshipRequests.length !== 0
    ) {
      loggedInUser.user.profile.friendshipRequests.forEach((friendRequest) => {
        if (!friendRequest.reverse) return
        showAppAlert({
          id: friendRequest.uuid + 'friend-request',
          title: `${friendRequest.username} sent you a friend request.`,
          status: 'info', // 'success', 'error', 'warning', 'info'
          duration: null,
          onAccept: () => handleAcceptFriendRequest(friendRequest),
          onReject: () => handleRejectFriendRequest(friendRequest),
          customRender: true,
        })
      })
    }
  }, [loggedInUser.user.profile])

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
    </div>
  )
}

export default withAxios(Noon)
