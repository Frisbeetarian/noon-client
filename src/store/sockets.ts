import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import SocketManager from '../components/SocketIo/SocketManager'
import { Auth } from '../utils/types'

interface SocketsState {
  socketId?: string | null
  isConnected: boolean
  socketError: boolean
  auth: Auth | null
}

const initialState: SocketsState = {
  socketId: null,
  isConnected: false,
  socketError: false,
  auth: null,
}

const socketsSlice = createSlice({
  name: 'sockets',
  initialState,
  reducers: {
    setSocketId: (state, action: PayloadAction<string>) => {
      state.socketId = action.payload
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload
    },
    setSocketError: (state, action: PayloadAction<boolean>) => {
      state.socketError = action.payload
    },
    socketDisconnected: (state) => {
      state.isConnected = false
      state.socketId = null

      const socketManager = SocketManager.getInstance(state.auth)
      socketManager?.disconnect()
    },
    connectSocket: (state, action) => {
      const socketManager = SocketManager.getInstance(action.payload)
      const socket = socketManager?.getSocket()

      if (socket) {
        state.auth = action.payload
        state.isConnected = true
        state.socketId = socket.id
      }
    },
    clearSocketsState: (_) => {
      return initialState
    },
  },
})

export const getSocketId = createSelector(
  (state) => state.entities.sockets,
  (sockets) => sockets.socketId
)

export const getSocketConnected = createSelector(
  (state) => state.entities.sockets,
  (sockets) => sockets.isConnected
)

export const getSocketAuthObject = createSelector(
  (state) => state.entities.sockets,
  (sockets) => sockets.auth
)

export const {
  setSocketId,
  setConnected,
  setSocketError,
  connectSocket,
  socketDisconnected,
  clearSocketsState,
} = socketsSlice.actions
export default socketsSlice.reducer
