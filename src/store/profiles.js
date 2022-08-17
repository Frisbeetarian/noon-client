import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
let lastId = 0

const slice = createSlice({
  name: 'profiles',
  initialState: {
    list: {},
  },
  reducers: {
    addProfiles: (profiles, action, loggedInUser) => {
      action.payload.profiles = action.payload.profiles.filter(
        (profile) =>
          profile.uuid != action.payload.loggedInUser.user.profile.uuid
      )

      action.payload.profiles.forEach((profile) => {
        const friendsCheck = action.payload.loggedInUser.user.friends.find(
          (element) => element.uuid == profile.uuid
        )

        const friendshipRequestCheck =
          action.payload.loggedInUser.user.friendshipRequests.find(
            (element) => element.uuid == profile.uuid
          )

        // const reverseFriendshipCheck = profile.friendshipRequests.find()
        profile.isAFriend = !!friendsCheck

        if (friendshipRequestCheck?.reverse) {
          profile.hasFriendshipRequestFromLoggedInProfile = true
        } else if (friendshipRequestCheck) {
          profile.hasSentFriendshipToProfile = true
        }
      })

      profiles.list = action.payload.profiles
    },
    setFriendshipRequestSentOnProfile: (profiles, action) => {
      let profile = profiles.list.find(
        (profile) => profile.uuid == action.payload.profileUuid
      )
      console.log('profile:', profile.uuid)
      profile.hasSentFriendshipToProfile = true
    },
    addProfile: (profiles, action) => {
      const { profile } = action.payload

      profiles.list = {
        ...profiles.list,
        [profile.uuid]: profile,
      }
    },
  },
})

export const getProfiles = createSelector(
  (state) => state.entities.profiles,
  (profiles) => profiles.list
)

export const { addProfile, addProfiles, setFriendshipRequestSentOnProfile } =
  slice.actions
export default slice.reducer
