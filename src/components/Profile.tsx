import React from 'react'
import { Avatar, Box, Button, Flex, useToast } from '@chakra-ui/react'

import { useDispatch, useSelector } from 'react-redux'
import { ChatIcon } from '@chakra-ui/icons'
import {
  cancelFriendshipRequestSentOnProfile,
  setFriendshipRequestSentOnProfile,
} from '../store/profiles'

import {
  getLoggedInUser,
  addFriendRequestEntry,
  removeFriendRequestEntry,
  addFriendEntry,
} from '../store/users'

import { getSocket } from '../store/sockets'
import {
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useSendFriendRequestMutation,
} from '../generated/graphql'
import { addConversation } from '../store/chat'
import { emitFriendshipRequestAccepted } from '../utils/SocketEmits'

// interface ProfileProps {
//   uuid: string
//   username: string
//   name: string
//   userId: string
//   updatedAt: Date
//   createdAt: Date
// }

export default function Profile({ profile }) {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)

  const [
    acceptFriendRequest,
    // { loading: acceptFriendRequestLoading }
  ] = useAcceptFriendRequestMutation()

  // const [, refuseFriendRequest] = useRefuseFriendRequestMutation()
  const [
    cancelFriendRequest,
    // { loading: cancelFriendRequestLoading }
  ] = useCancelFriendRequestMutation()

  const [
    sendFriendRequest,
    // { loading: sendFriendRequestLoading }
  ] = useSendFriendRequestMutation()
  const socket = useSelector(getSocket)
  const toast = useToast()
  // const toastIdRef = React.useRef()

  return (
    <Flex
      key={profile.uuid}
      className="items-center w-full justify-between  relative h-12 "
      style={{ flex: '1' }}
    >
      <Flex className="items-center ">
        <Avatar name={profile.username} size="sm" className="mr-2">
          {/*<AvatarBadge boxSize="1.25em" bg="red.500"></AvatarBadge>*/}
        </Avatar>

        <p className="">{profile.username}</p>
      </Flex>

      {profile.hasSentFriendshipRequestToProfile ? (
        <Flex className="relative">
          <Button
            disabled={true}
            className="relative text-green-500 p-0"
            style={{ borderRadius: '5px 0px 0px 5px' }}
          >
            Friendship request sent
          </Button>

          <Button
            disabled={false}
            className="absolute bg-red-500 text-white"
            bg="red"
            style={{ borderRadius: '0px 5px 5px 0px' }}
            onClick={async () => {
              const cancelFriendRequestResponse = await cancelFriendRequest({
                variables: {
                  profileUuid: profile.uuid,
                },
              })

              dispatch(
                cancelFriendshipRequestSentOnProfile({
                  profileUuid: profile.uuid,
                })
              )

              dispatch(
                removeFriendRequestEntry({
                  profileUuid: profile.uuid,
                  friendRequests: loggedInUser.user?.friendshipRequests,
                })
              )

              if (cancelFriendRequestResponse) {
                socket.emit('cancel-friend-request', {
                  content:
                    loggedInUser.user?.profile?.username +
                    ' cancelled the friend request.',
                  from: loggedInUser.user?.profile?.uuid,
                  fromUsername: loggedInUser.user?.profile?.username,
                  to: profile.uuid,
                  toUsername: profile.username,
                })
              }
            }}
          >
            Cancel
          </Button>
        </Flex>
      ) : profile.hasFriendshipRequestFromLoggedInProfile ? (
        <Flex className="justify-end mt-3">
          <Button
            className="mr-3 bg-green-500"
            variant="green"
            onClick={async () => {
              const acceptFriendshipResponse = await acceptFriendRequest({
                variables: {
                  profileUuid: profile.uuid,
                },
              })

              dispatch(
                removeFriendRequestEntry({
                  profileUuid: profile.uuid,
                  friendRequests: loggedInUser.user?.friendshipRequests,
                })
              )

              dispatch(
                addFriendEntry({
                  uuid: profile.uuid,
                  username: profile.username,
                })
              )

              dispatch(
                addConversation({
                  conversation:
                    acceptFriendshipResponse.data?.acceptFriendRequest,
                  loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
                })
              )

              if (acceptFriendshipResponse) {
                emitFriendshipRequestAccepted({
                  loggedInUser,
                  profile,
                  conversation:
                    acceptFriendshipResponse.data?.acceptFriendRequest,
                  socket,
                })
              }
              // if (toastIdRef.current) {
              toast.close(profile.uuid)
              // }
            }}
          >
            Accept
          </Button>
          <Button className="bg-red-500" variant="tomato">
            Reject
          </Button>
        </Flex>
      ) : (
        <Box>
          {profile.isAFriend ? (
            <Flex className="w-full z-40 h-full cursor-pointer">
              <ChatIcon
                className="mr-3 mt-1"
                onClick={() => {
                  // setActiveConverseeFunction(profile)
                }}
              />
            </Flex>
          ) : (
            <Button
              variant="green"
              className="bg-green-800"
              onClick={async () => {
                dispatch(
                  setFriendshipRequestSentOnProfile({
                    profileUuid: profile.uuid,
                  })
                )

                dispatch(
                  addFriendRequestEntry({
                    uuid: profile.uuid,
                    username: profile.username,
                    reverse: false,
                  })
                )

                await sendFriendRequest({
                  variables: {
                    profileUuid: profile.uuid,
                  },
                })

                socket.emit('send-friend-request', {
                  content:
                    loggedInUser.user?.profile?.username +
                    ' wants to be your friend.',
                  from: loggedInUser.user?.profile?.uuid,
                  fromUsername: loggedInUser.user?.profile?.username,
                  to: profile.uuid,
                  toUsername: profile.username,
                })
              }}
            >
              Send friend request
            </Button>
          )}
        </Box>
      )}
    </Flex>
  )
}
