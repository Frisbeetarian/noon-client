// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head'
import { CloseButton, Flex, useToast } from '@chakra-ui/react'

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
import AppButton from '../../components/AppComponents/AppButton'
import {
  cancelFriendshipRequestSentOnProfile,
  setFriendFlagOnProfile,
} from '../../store/profiles'
import Sidebar from '../../components/Sidebar'

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
  const [isCount, setIsCount] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

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
                        toast.close(
                          friendRequest.uuid +
                            'friend-request' +
                            loggedInUser.user.uuid
                        )
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

                    <AppButton
                      bg="black"
                      onClick={async () => {
                        try {
                          const response = await axios.post(
                            '/api/profiles/cancelFriendRequest',
                            {
                              profileUuid: friendRequest.uuid,
                            }
                          )

                          if (response.status === 200) {
                            dispatch(
                              cancelFriendshipRequestSentOnProfile({
                                profileUuid: friendRequest.uuid,
                              })
                            )
                            dispatch(
                              removeFriendRequestEntry({
                                profileUuid: friendRequest.uuid,
                                friendRequests:
                                  loggedInUser.user?.friendshipRequests,
                              })
                            )
                          }
                        } catch (error) {
                          console.error(
                            'Failed to cancel friend request:',
                            error
                          )
                        }

                        toast.close(
                          friendRequest.uuid +
                            'friend-request' +
                            loggedInUser.user.uuid
                        )
                      }}
                    >
                      Reject
                    </AppButton>
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
