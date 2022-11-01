import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'

import { getSocket } from './sockets'
import { useState } from 'react'
// import { createAsyncThunk } from '@reduxjs/toolkit/src/createAsyncThunk'
let lastId = 0
// const socket = (state) => state.sockets.socket

const slice = createSlice({
  name: 'ui',
  initialState: {
    chatComponent: 'closed',
    createGroupComponentOpen: false,
    search: {
      searchActive: false,
      containerDisplay: 'relative',
      containerHeight: '5vh',
      inputPadding: '5px',
      // searchInput: null,
    },
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
    setSearchComponent: (ui, action) => {
      ui.search.searchActive = action.payload.searchActive
      ui.search.containerDisplay = action.payload.containerDisplay
      ui.search.containerHeight = action.payload.containerHeight
      ui.search.inputPadding = action.payload.inputPadding
      // ui.search.searchInput = action.payload.searchInput

      // let [searchActive, setSearchActive] = useState(false)
      // let [containerHeight, setContainerHeight] = useState('5vh')
      // let [containerDisplay, setContainerDisplay] = useState('relative')
      // let [inputPadding, setInputPadding] = useState('5px')
      // let [searchInput, setSearchInput] = useState(null)
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

export const getSearchComponentState = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.search
)

export const {
  showFriendshipRequestToast,
  setChatComponentState,
  setCreateGroupComponent,
  setSearchComponent,
} = slice.actions

export default slice.reducer
