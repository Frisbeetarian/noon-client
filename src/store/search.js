import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

const slice = createSlice({
  name: 'search',
  initialState: {
    profiles: null,
  },
  reducers: {
    searchForProfileByUsername: (search, action) => {
      // ui.chatComponent = action.payload
    },
  },
})

export const getProfiles = createSelector(
  (state) => state.entities.search,
  (search) => search.profiles
)

export const { searchForProfileByUsername } = slice.actions
export default slice.reducer
