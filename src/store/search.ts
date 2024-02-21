import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { User } from '../utils/types'

interface SearchState {
  query: string | null
  profiles: ProfilePayload[] | null | undefined
  loading: boolean
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

const initialState: SearchState = {
  query: null,
  profiles: null,
  loading: false,
}

const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (search, action: PayloadAction<string | null>) => {
      search.query = action.payload
    },
    setProfiles: (search, action: PayloadAction<AddProfilesPayload>) => {
      const profilesArray: ProfilePayload[] = []

      if (action.payload.profiles == null) {
        search.profiles = null
      } else {
        action.payload.profiles.map((profile) => {
          const profileObject = { ...profile }

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
            profileObject.hasSentFriendshipRequestToProfile = true
          } else if (friendshipRequestCheck) {
            profileObject.hasFriendshipRequestFromLoggedInProfile = true
          }

          profilesArray.push(profileObject)
        })

        search.profiles = profilesArray
      }
    },
    setSearchLoading: (search, action: PayloadAction<boolean>) => {
      search.loading = action.payload
    },
    clearSearchState: (_) => {
      return initialState
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

export const getSearchIsLoading = createSelector(
  (state) => state.entities.search,
  (search) => search.loading
)

export const {
  setProfiles,
  setSearchQuery,
  setSearchLoading,
  clearSearchState,
} = slice.actions
export default slice.reducer
