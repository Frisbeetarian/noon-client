import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

let lastId = 0

const slice = createSlice({
  name: 'groups',
  initialState: {
    groups: null,
    groupBeingCreated: null,
  },
  reducers: {
    createGroup: (groups, action) => {
      groups.push({
        id: ++lastId,
        name: action.payload.name,
      })
    },
  },
})

export const getGroups = createSelector(
  (state) => state.entities.groups,
  (groups) => groups.groups
)

export const { createGroup } = slice.actions
export default slice.reducer
