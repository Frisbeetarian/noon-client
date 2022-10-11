import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'

import { getSocket } from './sockets'
// import { createAsyncThunk } from '@reduxjs/toolkit/src/createAsyncThunk'
let lastId = 0
// const socket = (state) => state.sockets.socket

const slice = createSlice({
  name: 'ui',
  initialState: {
    chatComponent: 'closed',
    createGroupComponentOpen: false,
  },
  reducers: {
    setSocket: (sockets, action) => {
      sockets.socket = action.payload.socket
    },
    showFriendshipRequestToast: (ui, action) => {},
    setChatComponentState: (ui, action) => {
      ui.chatComponent = action.payload
    },
    setCreateGroupComponent: (ui, action) => {
      ui.createGroupComponentOpen = action.payload
    },
  },
})

// export const socket = createAsyncThunk(
//   'sockets/socket',
//   async (_, thunkAPI) => {
//     const state = thunkAPI.getState()
//     console.log('GLOBAL STATE:', state)
//   }
// )

export const getChatComponentState = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.chatComponent
)

export const getCreateGroupComponent = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.createGroupComponentOpen
)

export const {
  showFriendshipRequestToast,
  setChatComponentState,
  setCreateGroupComponent,
} = slice.actions

export default slice.reducer
