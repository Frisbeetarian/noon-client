import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { User } from '../utils/types'

interface ProfilesState {
  list: ProfilePayload[]
}

interface AddProfilesPayload {
  profiles: ProfilePayload[]
  loggedInUser: User
}

interface ProfilePayload {
  uuid: string
  username: string
  userId: string
  name: string
  friends: []
  friendshipRequests: []
  isAFriend: boolean
  hasFriendshipRequestFromLoggedInProfile: boolean
  hasSentFriendshipRequestToProfile: boolean
  updatedAt: string
  createdAt: string
}

const initialState: ProfilesState = {
  list: [],
}

const slice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    addProfiles: (profiles, action: PayloadAction<AddProfilesPayload>) => {
      profiles.list = []

      const { profiles: incomingProfiles, loggedInUser } = action.payload

      if (incomingProfiles == null) {
        profiles.list = []
      } else {
        const updatedProfiles = incomingProfiles.filter(
          (profile) => profile.uuid !== loggedInUser.profile.uuid
        )

        updatedProfiles.forEach((profile) => {
          const updatedProfile = { ...profile }

          const isFriend = loggedInUser.profile.friends?.some(
            (friend) => friend.uuid === updatedProfile.uuid
          )

          console.log('loggedInUser.profile:', loggedInUser.profile)
          console.log('updatedProfile.uuid:', updatedProfile.uuid)

          const friendshipRequestCheck =
            loggedInUser.profile.friendshipRequests?.find(
              (request) => request.uuid === updatedProfile.uuid
            )

          updatedProfile.isAFriend = isFriend
          updatedProfile.hasFriendshipRequestFromLoggedInProfile =
            friendshipRequestCheck?.reverse || false
          updatedProfile.hasSentFriendshipRequestToProfile =
            !!friendshipRequestCheck && !friendshipRequestCheck.reverse

          profiles.list.push(updatedProfile)
        })
      }
    },
    setFriendshipRequestSentOnProfile: (profiles, action) => {
      const profile = profiles.list.find(
        (profile) => profile.uuid === action.payload.profileUuid
      )

      if (profile) {
        profile.hasSentFriendshipRequestToProfile = true
      }
    },
    cancelFriendshipRequestSentOnProfile: (profiles, action) => {
      const profile = profiles.list.find(
        (profile) => profile.uuid === action.payload.profileUuid
      )

      if (profile) {
        profile.hasSentFriendshipRequestToProfile = false
      }
    },
    setHasFriendshipRequestFromLoggedInProfile: (profiles, action) => {
      const profile = profiles.list.find(
        (profile) => profile.uuid === action.payload.profileUuid
      )
      if (profile) {
        profile.hasFriendshipRequestFromLoggedInProfile = true
      }
    },
    unsetHasFriendshipRequestFromLoggedInProfile: (profiles, action) => {
      const profile = profiles.list.find(
        (profile) => profile.uuid === action.payload.profileUuid
      )
      if (profile) {
        profile.hasFriendshipRequestFromLoggedInProfile = false
      }
    },
    setFriendFlagOnProfile: (profiles, action) => {
      const profile = profiles.list.find(
        (profile) => profile.uuid === action.payload.profileUuid
      )

      if (profile) {
        profile.isAFriend = true
        profile.hasFriendshipRequestFromLoggedInProfile = false
        profile.hasSentFriendshipRequestToProfile = false
      }
    },
    unsetFriendFlagOnProfile: (profiles, action) => {
      const profile = profiles.list.find(
        (profile) => profile.uuid === action.payload.profileUuid
      )

      if (profile) {
        profile.isAFriend = false
      }
    },
  },
})

export const getProfiles = createSelector(
  (state) => state.entities.profiles.list,
  (profiles) => profiles || []
)

// Create a selector to get profiles by name
export const getProfilesByName = createSelector(
  getProfiles,
  (_, name) => name, // Second argument to the selector function will be the name
  (profiles, name) => {
    // Filter the profiles by name
    return profiles.filter((profile) =>
      profile.name.toLowerCase().includes(name.toLowerCase())
    )
  }
)

// Create a selector to get profiles by username
export const getProfilesByUsername = createSelector(
  getProfiles,
  (_, username) => username,
  (profiles, username) => {
    return profiles.filter((profile) =>
      profile.username.toLowerCase().includes(username.toLowerCase())
    )
  }
)

export const {
  addProfiles,
  setFriendshipRequestSentOnProfile,
  cancelFriendshipRequestSentOnProfile,
  setFriendFlagOnProfile,
  setHasFriendshipRequestFromLoggedInProfile,
  unsetHasFriendshipRequestFromLoggedInProfile,
} = slice.actions

export default slice.reducer
