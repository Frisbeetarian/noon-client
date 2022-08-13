import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
let lastId = 0

const slice = createSlice({
  name: 'communities',
  initialState: {
    list: {},
  },
  reducers: {
    addCommunities: (communities, action) => {
      console.log('communities: ', action.payload)
    },
    addCommunity: (communities, action) => {
      const { community } = action.payload

      communities.list = {
        ...communities.list,
        [community.id]: community,
      }
    },
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
  },
})

export const getCommunities = createSelector(
  (state) => state.entities.communities,
  (communities) => communities.list
)

export const { addCommunities, addCommunity } = slice.actions
export default slice.reducer
