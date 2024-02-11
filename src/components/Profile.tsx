import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Box, Button, Flex, useToast } from '@chakra-ui/react'
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
import AppButton from './AppComponents/AppButton'

function Profile({ profile, axios }) {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const toast = useToast()

  return (
    <Flex
      key={profile.uuid}
      className="items-center w-full justify-between relative h-12 my-5"
      style={{ flex: '1' }}
    >
      <Flex className="items-center ">
        <Avatar name={profile.username} size="sm" className="mr-2">
          {/*<AvatarBadge boxSize="1.25em" bg="red.500"></AvatarBadge>*/}
        </Avatar>

        <p>{profile.username}</p>
      </Flex>

      {profile.hasSentFriendshipRequestToProfile ? (
        <Flex className="relative">
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

              toast.close(profile.uuid)
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
