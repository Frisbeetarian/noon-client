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

        if (friendsCheck) {
          profile.isAFriend = true
        } else {
          profile.isAFriend = false
        }
      })

      profiles.list = action.payload.profiles
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

export const { addProfile, addProfiles } = slice.actions
export default slice.reducer
