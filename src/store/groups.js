import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

let lastId = 0

const slice = createSlice({
  name: 'groups',
  initialState: {
    groups: null,
    groupBeingCreated: null,
    participants: [],
  },
  reducers: {
    createGroup: (groups, action) => {
      groups.push({
        id: ++lastId,
        name: action.payload.name,
      })
    },
    addParticipants: (groups, action) => {
      groups.participants.push(action.payload)
    },
    removeParticipants: (groups, action) => {
      const temp = [...groups.participants]
      temp.splice(temp.indexOf(action.payload), 1)
      groups.participants = temp
    },
  },
})

export const getGroups = createSelector(
  (state) => state.entities.groups,
  (groups) => groups.groups
)

export const getParticipants = createSelector(
  (state) => state.entities.groups,
  (groups) => groups.participants
)

export const { createGroup, addParticipants, removeParticipants } =
  slice.actions
export default slice.reducer
