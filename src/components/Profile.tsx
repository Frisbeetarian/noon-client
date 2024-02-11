import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Box, Flex, useToast, Button } from '@chakra-ui/react'
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

  const handleCancelFriendRequest = useCallback(async () => {
    try {
      const response = await axios.post('/api/profiles/cancelFriendRequest', {
        profileUuid: profile.uuid,
      })

      if (response.status === 200) {
        dispatch(
          cancelFriendshipRequestSentOnProfile({ profileUuid: profile.uuid })
        )
        dispatch(
          removeFriendRequestEntry({
            profileUuid: profile.uuid,
            friendRequests: loggedInUser.user?.friendshipRequests,
          })
        )
      }
    } catch (error) {
      console.error('Failed to cancel friend request:', error)
    }
  }, [axios, dispatch, loggedInUser.user?.friendshipRequests, profile.uuid])

  const handleSendFriendRequest = useCallback(async () => {
    try {
      const response = await axios.post('/api/profiles/sendFriendRequest', {
        profileUuid: profile.uuid,
      })

      if (response.status === 200) {
        dispatch(
          setFriendshipRequestSentOnProfile({ profileUuid: profile.uuid })
        )
        dispatch(
          addFriendRequestEntry({
            uuid: profile.uuid,
            username: profile.username,
            reverse: false,
          })
        )
      }
    } catch (error) {
      console.error('Failed to send friend request:', error)
    }
  }, [axios, dispatch, profile.uuid, profile.username])

  const handleAcceptFriendRequest = useCallback(() => {
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
  }, [
    dispatch,
    loggedInUser.user?.friendshipRequests,
    profile.uuid,
    profile.username,
    toast,
  ])

  return (
    <Flex
      key={profile.uuid}
      alignItems="center"
      justifyContent="space-between"
      className="w-full h-12 my-5 relative"
    >
      <Flex alignItems="center">
        <Avatar name={profile.username} size="sm" mr={2} />
        <p>{profile.username}</p>
      </Flex>

      {profile.hasSentFriendshipRequestToProfile ? (
        <Flex position="relative">
          <AppButton disabled={true}>Friendship request sent</AppButton>
          <AppButton
            className="absolute"
            colorScheme="red"
            onClick={handleCancelFriendRequest}
          >
            Cancel
          </AppButton>
        </Flex>
      ) : profile.hasFriendshipRequestFromLoggedInProfile ? (
        <Flex justifyContent="end" mt={3}>
          <Button
            colorScheme="green"
            mr={3}
            onClick={handleAcceptFriendRequest}
          >
            Accept
          </Button>
          <Button colorScheme="red">Reject</Button>
        </Flex>
      ) : (
        <Box>
          {profile.isAFriend ? (
            <Flex cursor="pointer" w="full" h="full" alignItems="center">
              <ChatIcon onClick={() => {}} mr={3} mt={1} />
            </Flex>
          ) : (
            <AppButton onClick={handleSendFriendRequest}>
              Send friend request
            </AppButton>
          )}
        </Box>
      )}
    </Flex>
  )
}

export default Profile
