import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { User } from '../utils/types'

interface ProfilesState {
  list: ProfilePayload[] | null
}

interface AddProfilesPayload {
  profiles: ProfilePayload[] | null | undefined
  loggedInUser: User
}

interface ProfilePayload {
  uuid: string
  username: string
  userId: string
  name: string
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
      // let profilesArray = [...action.payload.profiles]
      let profilesArray: ProfilePayload[] = []

      if (action.payload.profiles == null) {
        profiles.list = null
      } else {
        action.payload.profiles = action.payload.profiles.filter(
          (profile) => profile.uuid != action.payload.loggedInUser.profile.uuid
        )

        action.payload.profiles.map((profile) => {
          let profileObject = { ...profile }

          const friendsCheck = action.payload.loggedInUser.friends.find(
            (element) => element.uuid == profileObject.uuid
          )

          const friendshipRequestCheck =
            action.payload.loggedInUser.friendshipRequests.find(
              (element) => element.uuid == profileObject.uuid
            )

          // const reverseFriendshipCheck = profile.friendshipRequests.find()
          profileObject.isAFriend = !!friendsCheck

          if (friendshipRequestCheck?.reverse) {
            profileObject.hasFriendshipRequestFromLoggedInProfile = true
          } else if (friendshipRequestCheck) {
            profileObject.hasSentFriendshipRequestToProfile = true
          }

          // if (friendshipRequestCheck?.reverse) {
          //   profileObject.hasSentFriendshipRequestToProfile = true
          // } else if (friendshipRequestCheck) {
          //   profileObject.hasFriendshipRequestFromLoggedInProfile = true
          // }

          profilesArray.push(profileObject)
        })

        profiles.list = profilesArray
      }
    },
    setFriendshipRequestSentOnProfile: (profiles, action) => {
      let profile = profiles.list?.find(
        (profile) => profile.uuid == action.payload.profileUuid
      )

      if (profile) {
        profile.hasSentFriendshipRequestToProfile = true
      }
    },
    cancelFriendshipRequestSentOnProfile: (profiles, action) => {
      let profile = profiles.list?.find(
        (profile) => profile.uuid == action.payload.profileUuid
      )

      if (profile) {
        profile.hasSentFriendshipRequestToProfile = false
      }
    },
    setHasFriendshipRequestFromLoggedInProfile: (profiles, action) => {
      let profile = profiles.list?.find(
        (profile) => profile.uuid == action.payload.profileUuid
      )
      if (profile) {
        profile.hasFriendshipRequestFromLoggedInProfile = true
      }
    },
    unsetHasFriendshipRequestFromLoggedInProfile: (profiles, action) => {
      let profile = profiles.list?.find(
        (profile) => profile.uuid == action.payload.profileUuid
      )
      if (profile) {
        profile.hasFriendshipRequestFromLoggedInProfile = false
      }
    },
    setFriendFlagOnProfile: (profiles, action) => {
      if (profiles.list !== null && profiles.list?.length !== 0) {
        let profile = profiles.list.find(
          (profile) => profile.uuid == action.payload.profileUuid
        )

        if (profile) {
          profile.isAFriend = true
          profile.hasFriendshipRequestFromLoggedInProfile = false
          profile.hasSentFriendshipRequestToProfile = false
        }
      }
    },
    unsetFriendFlagOnProfile: (profiles, action) => {
      let profile = profiles.list?.find(
        (profile) => profile.uuid == action.payload.profileUuid
      )

      if (profile) {
        profile.isAFriend = true
      }
    },
    // addProfile: (profiles, action) => {
    //   const { profile } = action.payload
    //
    //   if (profiles.list) {
    //     profiles.list = {
    //       ...profiles.list,
    //       [profile.uuid]: profile,
    //     }
    //   }
    // },
  },
})

export const getProfiles = createSelector(
  (state) => state.entities.profiles,
  (profiles) => profiles.list
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
