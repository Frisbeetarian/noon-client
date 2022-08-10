import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
let lastId = 0

const slice = createSlice({
  name: 'profiles',
  initialState: {
    socket: null,
  },
  reducers: {},
})

export const { setSocket } = slice.actions
export default slice.reducer
