// @ts-nocheck
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from '../../components/Sidebar'

import { isServer } from '../../utils/isServer'
import {
  addFriendEntry,
  getLoggedInUser,
  removeFriendRequestEntry,
  setLoggedInUser,
} from '../../store/users'

import { setConversations, addConversation } from '../../store/chat'

import Chat from '../../components/Chat'
import { withAxios } from '../../utils/withAxios'
import { useRouter } from 'next/router'
import {
  getCreateGroupActive,
  getIsConversationOpen,
  getIsMobile,
} from '../../store/ui'
import SocketControls from '../../components/SocketIo/SocketControls'
import CreateGroupSidebar from '../../components/CreateGroupSidebar'
import SocketConnectionProvider from '../../providers/SocketConnectionProvider'
import { CloseButton, Flex, useToast } from '@chakra-ui/react'
import AppButton from '../../components/AppComponents/AppButton'
import { setFriendFlagOnProfile } from '../../store/profiles'
import { useGetConversationsQuery } from '../../store/api/conversationsApiSlice'

const meta = {
  title: 'Noon – Open source, secure, free communication platform.',
}
function Noon({ axios }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [mounted, setMounted] = useState(false)
  const isMobile = useSelector(getIsMobile)
  const isConversationOpen = useSelector(getIsConversationOpen)
  const createGroupActive = useSelector(getCreateGroupActive)
  const loggedInUser = useSelector(getLoggedInUser)
  // const conversations = useSelector(getConversations)
  const toast = useToast()
  const [isCount, setIsCount] = useState(0)
  // const [activeToasts, setActiveToasts] = useState({})
  // @ts-ignore
  const { data: conversations } = useGetConversationsQuery()

  useEffect(() => {
    setMounted(true)
    if (!isServer()) {
      axios
        .get('/api/users/me')
        .then((response) => {
          if (response.data.username) {
            dispatch(setLoggedInUser(response.data))
          } else {
            router.replace('/')
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error)
          router.replace('/')
        })
    }
  }, [])

  useEffect(() => {
    if (conversations) {
      dispatch(
        setConversations({
          conversationsToSend: conversations,
          loggedInProfileUuid: loggedInUser?.user?.profile?.uuid,
        })
      )
    }
  }, [conversations, dispatch])

  useEffect(() => {
    if (
      loggedInUser &&
      loggedInUser.user.profile &&
      loggedInUser.user?.profile?.friendshipRequests &&
      loggedInUser.user?.profile?.friendshipRequests.length !== 0
    ) {
      loggedInUser?.user?.profile?.friendshipRequests.forEach(
        (friendRequest) => {
          if (friendRequest.reverse) {
            setIsCount(isCount + 1)

            toast({
              id:
                friendRequest.uuid + 'friend-request' + loggedInUser.user.uuid,
              title: `${friendRequest.username} sent you a friend request.`,
              position: 'bottom-right',
              isClosable: true,
              status: 'success',
              duration: null,
              render: () => (
                <Flex direction="column" color="white" p={3} bg="#4B0E10">
                  <Flex>
                    <p>{friendRequest.username} sent you a friend request.</p>

                    <CloseButton
                      className="sticky top ml-4"
                      size="sm"
                      onClick={() => {
                        toast.close(friendRequest.uuid + 'friend-request')
                      }}
                      name="close button"
                    />
                  </Flex>

                  <Flex className="justify-end mt-3">
                    <AppButton
                      className="mr-3"
                      onClick={async () => {
                        const response = await axios.post(
                          '/api/profiles/acceptFriendRequest',
                          {
                            profileUuid: friendRequest.uuid,
                          }
                        )

                        if (response.status === 200) {
                          dispatch(
                            setFriendFlagOnProfile({
                              profileUuid: friendRequest.uuid,
                            })
                          )

                          dispatch(
                            removeFriendRequestEntry({
                              profileUuid: friendRequest.uuid,
                              friendRequests:
                                loggedInUser.user?.profile.friendshipRequests,
                            })
                          )

                          dispatch(
                            addFriendEntry({
                              uuid: friendRequest.uuid,
                              username: friendRequest.username,
                            })
                          )

                          dispatch(
                            addConversation({
                              conversation: response.data,
                              loggedInProfileUuid:
                                loggedInUser.user?.profile?.uuid,
                            })
                          )

                          toast.close(
                            friendRequest.uuid +
                              'friend-request' +
                              loggedInUser.user.uuid
                          )
                        }
                      }}
                    >
                      Accept
                    </AppButton>

                    <AppButton bg="black">Reject</AppButton>
                  </Flex>
                </Flex>
              ),
            })
          }
        }
      )
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
