import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
let lastId = 0

const slice = createSlice({
  name: 'users',
  initialState: {
    user: {},
  },
  reducers: {
    userAdded: (users, action) => {
      users.push({
        id: ++lastId,
        name: action.payload.name,
        bugsAssigned: [],
      })
    },
    assignBugToUser: (users, action) => {
      const { bugId, userId } = action.payload
      const index = users.findIndex((user) => user.id === userId)
      users[index].bugsAssigned.push(bugId)
    },
    setLoggedInUser: (users, action) => {
      if (action.payload.user?.me) {
        users.user = action.payload.user.me
      }
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

export const getBugsAssignedToUser = (state, action) => {
  const user = state.entities.users.filter((user) => user.id === action.id)
  const bugsForUser = []

  for (let index = 0; index <= user[0].bugsAssigned.length - 1; index++) {
    const bug = state.entities.bugs.filter(
      (bug) => bug.id === user[0].bugsAssigned[index]
    )

    bugsForUser.push(bug)
    // const fef = [...bugsForUser, bug];
  }

  // for(const bugId in user[0].bugsAssigned){
  //     const bug = state.entities.bugs.filter(bug => bug.id === bugId);
  //
  //     return [...bugsForUser, bug];
  // }
  /*    user[0].bugsAssigned.map(bugId => {
        const bug = state.entities.bugs.filter(bug => bug.id === bugId);

        return [...bugsForUser, bug];
    })*/

  return bugsForUser
}

export const { userAdded, assignBugToUser, setLoggedInUser } = slice.actions
export default slice.reducer
