import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

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
