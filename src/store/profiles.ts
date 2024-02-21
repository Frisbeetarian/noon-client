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
    addProfiles: (state, action: PayloadAction<AddProfilesPayload>) => {
      const { profiles: incomingProfiles, loggedInUser } = action.payload

      if (!incomingProfiles) {
        state.list = []
        return
      }

      const filteredAndUpdatedProfiles = incomingProfiles
        .filter((profile) => profile.uuid !== loggedInUser.profile.uuid)
        .map((profile) => {
          const isFriend = loggedInUser.profile.friends?.some(
            (friend) => friend.uuid === profile.uuid
          )
          const friendshipRequestCheck =
            loggedInUser.profile.friendshipRequests?.find(
              (request) => request.uuid === profile.uuid
            )

          return {
            ...profile,
            isAFriend: isFriend,
            hasFriendshipRequestFromLoggedInProfile:
              friendshipRequestCheck?.reverse || false,
            hasSentFriendshipRequestToProfile:
              !!friendshipRequestCheck && !friendshipRequestCheck.reverse,
          }
        })

      state.list = filteredAndUpdatedProfiles
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
    clearProfilesState: (_) => {
      return initialState
    },
  },
})

export const getProfiles = createSelector(
  (state) => state.entities.profiles.list,
  (profiles) => profiles || []
)

export const getProfilesByName = createSelector(
  getProfiles,
  (_, name) => name,
  (profiles, name) => {
    // Filter the profiles by name
    return profiles.filter((profile) =>
      profile.name.toLowerCase().includes(name.toLowerCase())
    )
  }
)

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
  clearProfilesState,
} = slice.actions

export default slice.reducer
