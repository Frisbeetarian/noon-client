import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

const slice = createSlice({
  name: 'search',
  initialState: {
    query: null,
    profiles: null,
  },
  reducers: {
    setSearchQuery: (search, action) => {
      console.log('action payloa:', action.payload)
      search.query = action.payload
    },
    setProfiles: (search, action) => {
      let profilesArray = []

      // action.payload.profiles = action.payload.profiles.filter(
      //   (profile) =>
      //     profile.uuid != action.payload.loggedInUser.user.profile.uuid
      // )

      action.payload.profiles.map((profile) => {
        let profileObject = { ...profile }

        const friendsCheck = action.payload.loggedInUser.user.friends.find(
          (element) => element.uuid == profileObject.uuid
        )

        const friendshipRequestCheck =
          action.payload.loggedInUser.user.friendshipRequests.find(
            (element) => element.uuid == profileObject.uuid
          )

        // const reverseFriendshipCheck = profile.friendshipRequests.find()
        profileObject.isAFriend = !!friendsCheck

        if (friendshipRequestCheck?.reverse) {
          profileObject.hasSentFriendshipRequestToProfile = true
        } else if (friendshipRequestCheck) {
          profileObject.hasFriendshipRequestFromLoggedInProfile = true
        }

        console.log('PROFILE OBJECT:', profileObject)
        profilesArray.push(profileObject)
      })

      search.profiles = profilesArray
    },
  },
})

export const getSearchQuery = createSelector(
  (state) => state.entities.search,
  (search) => search.query
)

export const getProfiles = createSelector(
  (state) => state.entities.search,
  (search) => search.profiles
)

export const { setProfiles, setSearchQuery } = slice.actions
export default slice.reducer
