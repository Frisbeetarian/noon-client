import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
let lastId = 0

const slice = createSlice({
  name: 'profiles',
  initialState: {
    list: {},
  },
  reducers: {
    addProfiles: (profiles, action) => {
      console.log('communities: ', action.payload)
      profiles.list = action.payload
    },
    addProfile: (profiles, action) => {
      const { community } = action.payload

      profiles.list = {
        ...profiles.list,
        [community.id]: community,
      }
    },
  },
})

export const getProfiles = createSelector(
  (state) => state.entities.profiles,
  (profiles) => profiles.list
)

export const { addProfile, addProfiles } = slice.actions
export default slice.reducer
