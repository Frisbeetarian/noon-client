import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

interface GroupsState {
  groups: null
  groupBeingCreated: null
  participants: string[]
}

const initialState: GroupsState = {
  groups: null,
  groupBeingCreated: null,
  participants: [],
}

const slice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    clearState: (groups) => {
      groups.participants = []
      groups.groupBeingCreated = null
    },
    addParticipants: (groups, action: PayloadAction<string>) => {
      groups.participants.push(action.payload)
    },
    removeParticipants: (groups, action: PayloadAction<string>) => {
      const temp = [...groups.participants]
      temp.splice(temp.indexOf(action.payload), 1)
      groups.participants = temp
    },
    clearGroupsState: (_) => {
      return initialState
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

export const {
  addParticipants,
  removeParticipants,
  clearState,
  clearGroupsState,
} = slice.actions
export default slice.reducer
