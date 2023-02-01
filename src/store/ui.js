import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'
import { getSocket } from './sockets'
import { useState } from 'react'

let lastId = 0

const slice = createSlice({
  name: 'ui',
  initialState: {
    chatComponent: 'closed',
    createGroupComponentOpen: false,
    chatContainerHeight: '87.5vh',
    isMobile: false,
    isConversationOpen: false,
    search: {
      searchActive: false,
      containerDisplay: 'relative',
      containerHeight: '5vh',
      inputPadding: '5px',
      // searchInput: null,
    },
  },
  reducers: {
    setIsMobile: (ui, action) => {
      ui.isMobile = action.payload
    },
    setConversationOpen: (ui, action) => {
      ui.isConversationOpen = action.payload
    },
    setChatComponentState: (ui, action) => {
      ui.chatComponent = action.payload
    },
    setCreateGroupComponent: (ui, action) => {
      ui.createGroupComponentOpen = action.payload
    },
    setChatContainerHeight: (ui, action) => {
      ui.chatContainerHeight = action.payload
    },
    setSearchComponent: (ui, action) => {
      ui.search.searchActive = action.payload.searchActive
      ui.search.containerDisplay = action.payload.containerDisplay
      ui.search.containerHeight = action.payload.containerHeight
      ui.search.inputPadding = action.payload.inputPadding
    },
  },
})

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

export const getChatContainerHeight = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.chatContainerHeight
)

export const getIsMobile = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.isMobile
)

export const getIsConversationOpen = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.isConversationOpen
)

export const {
  showFriendshipRequestToast,
  setChatComponentState,
  setIsMobile,
  setConversationOpen,
  setCreateGroupComponent,
  setSearchComponent,
  setChatContainerHeight,
} = slice.actions

export default slice.reducer
