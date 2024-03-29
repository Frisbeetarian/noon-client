const acceptFriendRequest = async ({
  axios,
  dispatch,
  friendRequest,
  loggedInUser,
  setFriendFlagOnProfile,
  removeFriendRequestEntry,
  addFriendEntry,
  addConversation,
  toastId = null,
  toast = null,
}) => {
  try {
    const response = await axios.post('/api/profiles/acceptFriendRequest', {
      profileUuid: friendRequest.uuid,
    })

    if (response.status === 200) {
      const friendPublicKeyResponse = await axios.get(
        `api/users/publicKeys/${friendRequest.uuid}`
      )

      dispatch(setFriendFlagOnProfile({ profileUuid: friendRequest.uuid }))
      dispatch(
        removeFriendRequestEntry({
          profileUuid: friendRequest.uuid,
          friendRequests: loggedInUser.user?.profile.friendshipRequests,
        })
      )
      dispatch(
        addFriendEntry({
          uuid: friendRequest.uuid,
          username: friendRequest.username,
          name: friendRequest.username,
          publicKey: friendPublicKeyResponse.data.publicKey,
        })
      )
      dispatch(
        addConversation({
          conversation: response.data,
          loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
        })
      )

      if (toast) {
        // @ts-ignore
        toast.close(toastId)
      }

      return response
    }
  } catch (error) {
    console.error('Failed to accept friend request:', error)
  }
}

const cancelFriendRequest = async ({
  axios,
  dispatch,
  friendRequest,
  loggedInUser,
  cancelFriendshipRequestSentOnProfile,
  removeFriendRequestEntry,
  toastId = null,
  toast = null,
}) => {
  try {
    const response = await axios.post('/api/profiles/cancelFriendRequest', {
      profileUuid: friendRequest.uuid,
    })

    if (response.status === 200) {
      dispatch(
        cancelFriendshipRequestSentOnProfile({
          profileUuid: friendRequest.uuid,
        })
      )

      dispatch(
        removeFriendRequestEntry({
          profileUuid: friendRequest.uuid,
          friendRequests: loggedInUser.user?.friendshipRequests,
        })
      )

      if (toast) {
        // @ts-ignore
        toast.close(toastId)
      }

      return response
    }
  } catch (error) {
    console.error('Failed to cancel friend request:', error)
  }
}

const rejectFriendRequest = async ({
  axios,
  dispatch,
  friendRequest,
  loggedInUser,
  unsetHasFriendshipRequestFromLoggedInProfile,
  removeFriendRequestEntry,
  toastId = null,
  toast = null,
}) => {
  try {
    const response = await axios.post('/api/profiles/cancelFriendRequest', {
      profileUuid: friendRequest.uuid,
    })

    if (response.status === 200) {
      dispatch(
        unsetHasFriendshipRequestFromLoggedInProfile({
          profileUuid: friendRequest.uuid,
        })
      )

      dispatch(
        removeFriendRequestEntry({
          profileUuid: friendRequest.uuid,
          friendRequests: loggedInUser.user?.friendshipRequests,
        })
      )

      if (toast) {
        // @ts-ignore
        toast.close(toastId)
      }

      return response
    }
  } catch (error) {
    console.error('Failed to cancel friend request:', error)
  }
}

export { acceptFriendRequest, cancelFriendRequest, rejectFriendRequest }
