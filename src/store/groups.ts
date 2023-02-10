import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

interface GroupsState {
  groups: null
  groupBeingCreated: null
  participants: String[]
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

export const { createGroup, addParticipants, removeParticipants, clearState } =
  slice.actions
export default slice.reducer
