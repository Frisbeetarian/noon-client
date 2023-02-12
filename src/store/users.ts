import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import {
  Friend,
  FriendshipRequestSnippetFragment,
  User,
} from '../generated/graphql'
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
      // console.log('retrieved user: ', action.payload)
      if (action.payload) {
        users.user = action.payload
      }
    },
    addFriendRequestEntry: (users, action: PayloadAction<FriendRequest>) => {
      // const userObject = { ...users.user }
      // const friendshipRequests: FriendRequest[] = <FriendRequest[]>{
      //   ...users.user?.friendshipRequests,
      // }

      // if (friendshipRequests) {
      users.user?.friendshipRequests?.push(<FriendRequest>action.payload)
      // }
    },
    removeFriendRequestEntry: (
      users,
      action: PayloadAction<RemoveFriendRequestEntryPayload>
    ) => {
      const friendRequests: FriendRequest[] =
        action.payload.friendRequests.filter(
          (FREntry: FriendRequest) => FREntry.uuid != action.payload.profileUuid
        )

      const userObject: User = <User>{ ...users.user }
      if (friendRequests) {
        userObject.friendshipRequests = friendRequests
        // userObject.friendshipRequests?.push(friendRequests)
      }
    },
    addFriendEntry: (users, action: PayloadAction<Friend>) => {
      try {
        // const userObject = { ...users.user }
        users.user?.friends?.push(action.payload)
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

      // const userObject = { ...users.user }
      if (users.user) users.user.friends = friends

      // userObject.friends?.push(friends)
    },
  },
})

// selector
export const getUser = (state, action) => {
  return state.entities.users.filter((user) => user.id === action.id)
  // return state.entities.bugs.filter(bug => !bug.resolved)
}

export const getLoggedInUser = createSelector(
  (state) => state.entities.users,
  (user) => user
)

// export const getBugsAssignedToUser = (state, action) => {
//   const user = state.entities.users.filter((user) => user.id === action.id)
//   const bugsForUser = []
//
//   // for (let index = 0; index <= user[0].bugsAssigned.length - 1; index++) {
//     // const bug = state.entities.bugs.filter(
//     //   (bug) => bug.id === user[0].bugsAssigned[index]
//     // )
//
//     // bugsForUser.push(bug)
//     // const fef = [...bugsForUser, bug];
//   // }
//
//   return bugsForUser
// }

export const {
  setLoggedInUser,
  addFriendRequestEntry,
  removeFriendRequestEntry,
  addFriendEntry,
  removeFriendEntry,
} = slice.actions
export default slice.reducer
