const acceptFriendRequest = async ({
  axios,
  dispatch,
  friendRequest,
  setAlerts,
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
        })
      )
      dispatch(
        addConversation({
          conversation: response.data,
          loggedInProfileUuid: loggedInUser.user?.profile?.uuid,
        })
      )

      setAlerts((currentAlerts) =>
        currentAlerts.filter(
          (alert) =>
            alert.id !==
            friendRequest.uuid + 'friend-request' + loggedInUser.user.uuid
        )
      )
      if (toast) {
        toast.close(toastId)
      }
    }
  } catch (error) {
    console.error('Failed to accept friend request:', error)
  }
}

const rejectFriendRequest = async ({
  axios,
  dispatch,
  friendRequest,
  setAlerts,
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

      setAlerts((currentAlerts) =>
        currentAlerts.filter(
          (alert) =>
            alert.id !==
            friendRequest.uuid + 'friend-request' + loggedInUser.user.uuid
        )
      )

      if (toast) {
        toast.close(toastId)
      }
    }
  } catch (error) {
    console.error('Failed to cancel friend request:', error)
  }
}

export { acceptFriendRequest, rejectFriendRequest }
