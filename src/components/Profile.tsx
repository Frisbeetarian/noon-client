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

import { addConversation } from '../store/chat'
import { emitFriendshipRequestAccepted } from '../utils/SocketEmits'
import SocketManager from './SocketIo/SocketManager'
import { getSocketAuthObject } from '../store/sockets'
import AppButton from './AppComponents/AppButton'

function Profile({ profile, axios }) {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const socketAuthObject = useSelector(getSocketAuthObject)

  // const [
  //   acceptFriendRequest,
  //   // { loading: acceptFriendRequestLoading }
  // ] = useAcceptFriendRequestMutation()

  // const [, refuseFriendRequest] = useRefuseFriendRequestMutation()
  // const [
  //   cancelFriendRequest,
  //   // { loading: cancelFriendRequestLoading }
  // ] = useCancelFriendRequestMutation()

  // const [
  //   sendFriendRequest,
  //   // { loading: sendFriendRequestLoading }
  // ] = useSendFriendRequestMutation()
  // const socket = useSelector(getSocket)
  const socket = SocketManager.getInstance(socketAuthObject)?.getSocket()

  const toast = useToast()
  // const toastIdRef = React.useRef()

  return (
    <Flex
      key={profile.uuid}
      className="items-center w-full justify-between  relative h-12 my-5"
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
          {/*<Button*/}
          {/*  disabled={true}*/}
          {/*  className="relative text-green-500 p-0"*/}
          {/*  borderRadius="0"*/}
          {/*  fontFamily="Menlo"*/}
          {/*  bg="#921A1C"*/}
          {/*></Button>*/}

          <AppButton
            color="#921A1C"
            bg="black"
            borderRadius="0"
            fontFamily="Menlo"
            disabled={true}
            onClick={() => console.log('Button clicked')}
          >
            Friendship request sent
          </AppButton>

          <AppButton
            disabled={false}
            className="absolute"
            borderRadius="0"
            fontFamily="Menlo"
            color="white"
            bg="#921A1C"
            onClick={async () => {
              const response = await axios.post(
                '/api/profiles/cancelFriendRequest',
                { profileUuid: profile.uuid }
              )

              if (response.status === 200) {
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
              }
            }}
          >
            Cancel
          </AppButton>
        </Flex>
      ) : profile.hasFriendshipRequestFromLoggedInProfile ? (
        <Flex className="justify-end mt-3">
          <Button
            className="mr-3 bg-green-500"
            variant="green"
            onClick={async () => {
              // const acceptFriendshipResponse = await acceptFriendRequest({
              //   variables: {
              //     profileUuid: profile.uuid,
              //   },
              // })

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

              // dispatch(
              //   addConversation({
              //     conversation:
              //       acceptFriendshipResponse.data?.acceptFriendRequest,
              //     loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
              //   })
              // )

              // if (acceptFriendshipResponse) {
              //   emitFriendshipRequestAccepted({
              //     loggedInUser,
              //     profile,
              //     conversation:
              //       acceptFriendshipResponse.data?.acceptFriendRequest,
              //     socket,
              //   })
              // }
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
            <AppButton
              onClick={async () => {
                const response = await axios.post(
                  '/api/profiles/sendFriendRequest',
                  { profileUuid: profile.uuid }
                )

                if (response.status === 200) {
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
                }
              }}
            >
              Send friend request
            </AppButton>
          )}
        </Box>
      )}
    </Flex>
  )
}

export default Profile
