import React, { useCallback, useState } from 'react'
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
  const [isFriendRequestLoading, setIsFriendRequestLoading] = useState(false)
  const [isCancelRequestLoading, setIsCancelRequestLoading] = useState(false)

  const handleCancelFriendRequest = useCallback(async () => {
    try {
      setIsCancelRequestLoading(true)
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

        setIsCancelRequestLoading(false)
      }
    } catch (error) {
      console.error('Failed to cancel friend request:', error)
      setIsCancelRequestLoading(false)
    }
  }, [axios, dispatch, loggedInUser.user?.friendshipRequests, profile.uuid])

  const handleSendFriendRequest = useCallback(async () => {
    try {
      setIsFriendRequestLoading(true)
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

        setIsFriendRequestLoading(false)
      }
    } catch (error) {
      console.error('Failed to send friend request:', error)
      setIsFriendRequestLoading(false)
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
            colorScheme="red"
            onClick={handleCancelFriendRequest}
            isLoading={isCancelRequestLoading}
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
            <AppButton
              onClick={handleSendFriendRequest}
              isLoading={isFriendRequestLoading}
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
