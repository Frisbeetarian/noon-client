import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'
import { getSocket } from './sockets'
// import { createAsyncThunk } from '@reduxjs/toolkit/src/createAsyncThunk'
let lastId = 0
// const socket = (state) => state.sockets.socket

const slice = createSlice({
  name: 'ui',
  initialState: {},
  reducers: {
    setSocket: (sockets, action) => {
      sockets.socket = action.payload.socket
    },
    showFriendshipRequestToast: (ui, action) => {},
  },
})
//
// export const socket = createAsyncThunk(
//   'sockets/socket',
//   async (_, thunkAPI) => {
//     const state = thunkAPI.getState()
//     console.log('GLOBAL STATE:', state)
//   }
// )

export const { showFriendshipRequestToast } = slice.actions
export default slice.reducer
