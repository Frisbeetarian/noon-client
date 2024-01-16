import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import SocketManager from '../components/SocketIo/SocketManager'

interface SocketsState {
  socketId?: string | null
  isConnected: boolean
  socketError: boolean
}

const initialState: SocketsState = {
  isConnected: false,
  socketError: false,
}

export const connectSocket = createAsyncThunk(
  'sockets/connect',
  async (auth, { dispatch, rejectWithValue }) => {
    try {
      const socket = await SocketManager.connect(auth)

      socket.on('session', ({ sessionID, userID }) => {
        socket.auth = { sessionID }
        socket.userID = userID
        localStorage.setItem('sessionID', sessionID)
      })

      socket.on('connect', () => {
        dispatch(setConnected(true))
        dispatch(setSocketId(socket.id))
      })

      socket.on('disconnect', () => {
        dispatch(setConnected(false))
      })

      socket.on('connect_error', (err) => {
        if (err.message === 'invalid username') {
          dispatch(setConnected(false))
        }
      })

      socket.onAny((event, ...args) => {
        console.log(event, args)
      })
      return socket.id
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const disconnectSocket = createAsyncThunk(
  'sockets/disconnect',
  async (_, { dispatch }) => {
    SocketManager.disconnect()
    dispatch(setConnected(false))
    dispatch(setSocketId(null))
  }
)

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

export const { setSocketId, setConnected, setSocketError } =
  socketsSlice.actions
export default socketsSlice.reducer
