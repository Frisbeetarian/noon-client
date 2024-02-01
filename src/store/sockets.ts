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

// export const connectSocket = createAsyncThunk(
//   'sockets/connect',
//   async (auth, { dispatch, rejectWithValue }) => {
//     try {
//       const socket = await SocketManager.getInstance(auth)
//       console.log('connected:', socket.connected)
//
//       // const sockSocketManager.getInstance().connect(auth)
//       // socket.on('session', ({ sessionID, userID }) => {
//       //   socket.auth = { sessionID }
//       //   socket.userID = userID
//       //   localStorage.setItem('sessionID', sessionID)
//       // })
//       //
//       // socket.on('connect', () => {
//       //   dispatch(setConnected(true))
//       //   dispatch(setSocketId(socket.id))
//       // })
//       //
//       // socket.on('disconnect', () => {
//       //   dispatch(setConnected(false))
//       // })
//       //
//       // socket.on('connect_error', (err) => {
//       //   if (err.message === 'invalid username') {
//       //     dispatch(setConnected(false))
//       //   }
//       // })
//       //
//       // socket.onAny((event, ...args) => {
//       //   console.log(event, args)
//       //
//       //   if (event === 'send-friend-request') {
//       //     const senderUuid = args[0].senderUuid
//       //     const senderUsername = args[0].senderUsername
//       //
//       //     dispatch(
//       //       addFriendRequestEntry({
//       //         uuid: senderUuid,
//       //         username: senderUsername,
//       //         reverse: true,
//       //       })
//       //     )
//       //
//       //     // toast({ type: 'success' }, { senderUuid, senderUsername })
//       //   }
//       // })
//       // return socket.id
//     } catch (error) {
//       return rejectWithValue(error)
//     }
//   }
// )

// export const disconnectSocket = createAsyncThunk(
//   'sockets/disconnect',
//   async (_, { dispatch }) => {
//     SocketManager.disconnect()
//     dispatch(setConnected(false))
//     dispatch(setSocketId(null))
//   }
// )

// export const getSocketInstance = createAsyncThunk(
//   'sockets/getInstance',
//   async (_, { dispatch }) => {
//     const socket = SocketManager.getSocket()
//
//     if (socket) {
//       // Perform operations with the socket instance
//       // For example, you might want to listen to certain events
//       socket.on('send-friend-request', (data) => {
//         console.log('GOT FRIEND REQUEST')
//         // Dispatch actions based on the event
//         // dispatch(someReduxAction(data));
//       })
//
//       // Return some relevant data or state if needed
//       return { isConnected: socket.connected, socketId: socket.id }
//     } else {
//       // Handle the case where the socket is not connected/available
//       // dispatch(someOtherReduxAction());
//       return { isConnected: false }
//     }
//   }
// )

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
} = socketsSlice.actions
export default socketsSlice.reducer
