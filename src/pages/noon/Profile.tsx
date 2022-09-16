import React from 'react'
import { Avatar, Box, Button, Flex } from '@chakra-ui/react'
import { getLoggedInUser } from '../../store/users'
import { getSocket } from '../../store/sockets'
import { useDispatch } from 'react-redux'
import { ChatIcon } from '@chakra-ui/icons'
import { setFriendshipRequestSentOnProfile } from '../../store/profiles'
import {
  useAcceptFriendRequestMutation,
  useSendFriendRequestMutation,
} from '../../generated/graphql'

interface ProfileProps {
  uuid: string
  username: string
  name: string
  userId: string
  updatedAt: Date
  createdAt: Date
}

export default function Profile({ profile }) {
  const dispatch = useDispatch()
  const [, acceptFriendRequest] = useAcceptFriendRequestMutation()
  const [{ fetching: friendRequestFetching }, sendFriendRequest] =
    useSendFriendRequestMutation()

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

      {profile.hasFriendshipRequestFromLoggedInProfile ? (
        <Button disabled={true} className="text-green-500">
          Friendship request sent
        </Button>
      ) : profile.hasSentFriendshipRequestToProfile ? (
        <Flex className="justify-end mt-3">
          <Button
            className="mr-3 bg-green-500"
            variant="ghost"
            onClick={async () => {
              const acceptFriendshipResponse = await acceptFriendRequest({
                profileUuid: profile.uuid,
              })

              if (acceptFriendshipResponse) {
                // socket.emit('friendship-request-accepted', {
                //   content:
                //     loggedInUser.user?.profile?.username +
                //     ' accepted your friend request.',
                //   from: loggedInUser.user?.profile?.uuid,
                //   fromUsername: loggedInUser.user?.profile?.username,
                //   to: profile.uuid,
                //   toUsername: profile.username,
                // })
              }
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
              onClick={async () => {
                dispatch(
                  setFriendshipRequestSentOnProfile({
                    profileUuid: profile.uuid,
                  })
                )

                await sendFriendRequest({
                  profileUuid: profile.uuid,
                })

                // socket.emit('private message', {
                //   content:
                //     loggedInUser.user?.profile?.username +
                //     ' wants to be your friend.',
                //   from: loggedInUser.user?.profile?.uuid,
                //   fromUsername: loggedInUser.user?.profile?.username,
                //   to: profile.uuid,
                //   toUsername: profile.username,
                // })
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
