import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

interface SocketsState {
  socketId?: string
  isConnected: boolean
  socketError: boolean
}

const initialState: SocketsState = {
  isConnected: false,
  socketError: false,
}

const socketsSlice = createSlice({
  name: 'sockets',
  initialState,
  reducers: {
    setSocketId: (state, action: PayloadAction<{ socketId: string }>) => {
      state.socketId = action.payload.socketId
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload
    },
    setSocketError: (state, action: PayloadAction<boolean>) => {
      state.socketError = action.payload
    },
  },
})

export const getSocketId = createSelector(
  (state) => state.entities.sockets,
  (sockets) => sockets.socketId
)

export const { setSocketId, setConnected, setSocketError } =
  socketsSlice.actions
export default socketsSlice.reducer
