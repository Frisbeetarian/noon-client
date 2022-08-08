import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
let lastId = 0

const slice = createSlice({
  name: 'sockets',
  initialState: {
    socket: null,
  },
  reducers: {
    setSocket: (sockets, action) => {
      sockets.socket = action.payload.socket
    },
  },
})

export const getSocket = createSelector(
  (state) => state.entities.sockets,
  (sockets) => sockets.socket
)

export const { setSocket } = slice.actions
export default slice.reducer
