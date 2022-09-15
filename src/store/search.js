import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

const slice = createSlice({
  name: 'search',
  initialState: {
    query: null,
    profiles: null,
  },
  reducers: {
    setSearchQuery: (search, action) => {
      console.log('action payloa:', action.payload)
      search.query = action.payload
    },
    setProfiles: (search, action) => {
      // ui.chatComponent = action.payload
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

export const { setProfiles, setSearchQuery } = slice.actions
export default slice.reducer
