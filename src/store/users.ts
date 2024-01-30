import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { Friend, User } from '../generated/graphql'
import { FriendRequest } from '../utils/types'

interface UsersState {
  user: User | Record<string, never> | null | undefined
}

interface RemoveFriendEntryPayload {
  profileUuid: string
  friends: Friend[]
}

interface RemoveFriendRequestEntryPayload {
  profileUuid: string
  friendRequests: FriendRequest[]
}

const initialState: UsersState = {
  user: {},
}

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoggedInUser: (users, action: PayloadAction<User>) => {
      if (action.payload) {
        users.user = action.payload
      }
    },
    addFriendRequestEntry: (users, action: PayloadAction<FriendRequest>) => {
      if (users.user?.friendshipRequests) {
        users.user.friendshipRequests = [
          ...users.user.friendshipRequests,
          action.payload,
        ]
      } else {
        // @ts-ignore
        users.user.friendshipRequests = [action.payload]
      }
    },
    removeFriendRequestEntry: (
      users,
      action: PayloadAction<RemoveFriendRequestEntryPayload>
    ) => {
      if (users.user && users.user.friendshipRequests) {
        users.user.friendshipRequests = users.user.friendshipRequests.filter(
          (FREntry) => FREntry.uuid !== action.payload.profileUuid
        )
      }
    },
    addFriendEntry: (users, action: PayloadAction<Friend>) => {
      try {
        users.user?.profile?.friends?.push(action.payload)
      } catch (e) {
        console.log('error:', e)
      }
    },
    removeFriendEntry: (
      users,
      action: PayloadAction<RemoveFriendEntryPayload>
    ) => {
      const friends = action.payload.friends.filter(
        (FREntry) => FREntry.uuid != action.payload.profileUuid
      )

      if (users.user) users.user.profile.friends = friends
    },
  },
})

// selector
export const getUser = (state, action) => {
  return state.entities.users.filter((user) => user.id === action.id)
}

export const getLoggedInUser = createSelector(
  (state) => state.entities.users,
  (user) => user
)

export const {
  setLoggedInUser,
  addFriendRequestEntry,
  removeFriendRequestEntry,
  addFriendEntry,
  removeFriendEntry,
} = slice.actions
export default slice.reducer
