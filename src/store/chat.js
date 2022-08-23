import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'
import { getSocket } from './sockets'

const slice = createSlice({
  name: 'chat',
  initialState: {
    activeConversee: null,
  },
  reducers: {
    setSocket: (chat, action) => {},
    setActiveConversee: (chat, action) => {
      console.log('set active conversee uuid:', action.payload)
      chat.activeConversee = action.payload
    },
  },
})

export const getActiveConversee = createSelector(
  (state) => state.entities.chat,
  (chat) => chat.activeConversee
)

export const { setActiveConversee } = slice.actions
export default slice.reducer
