import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

interface UIState {
  chatComponent: string
  createGroupComponentOpen: boolean
  chatContainerHeight: string
  isMobile: boolean
  isConversationOpen: boolean
  search: UISearchState
  authentication: UIAuthenticationState
  createGroup: UICreateGroupState
}

interface UISearchState {
  searchActive: boolean
  containerDisplay: string
  containerHeight: string
  inputPadding: string
}

interface UIAuthenticationState {
  showRegisterComponent: boolean
  showLoginComponent: boolean
  showForgotPasswordComponent: boolean
}

interface UICreateGroupState {
  active: boolean
}

const initialState: UIState = {
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
  },
  authentication: {
    showRegisterComponent: true,
    showLoginComponent: false,
    showForgotPasswordComponent: false,
  },
  createGroup: {
    active: false,
  },
}

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setShowRegisterComponent: (ui, action: PayloadAction<boolean>) => {
      ui.authentication.showRegisterComponent = action.payload
    },
    setShowLoginComponent: (ui, action: PayloadAction<boolean>) => {
      ui.authentication.showLoginComponent = action.payload
    },
    setShowForgotPasswordComponent: (ui, action: PayloadAction<boolean>) => {
      ui.authentication.showForgotPasswordComponent = action.payload
    },
    setIsMobile: (ui, action: PayloadAction<boolean>) => {
      ui.isMobile = action.payload
    },
    toggleCreateGroupActive: (ui, action: PayloadAction<boolean>) => {
      ui.createGroup.active = action.payload
    },
    setConversationOpen: (ui, action: PayloadAction<boolean>) => {
      ui.isConversationOpen = action.payload
    },
    setChatComponentState: (ui, action: PayloadAction<string>) => {
      ui.chatComponent = action.payload
    },
    setCreateGroupComponent: (ui, action: PayloadAction<boolean>) => {
      ui.createGroupComponentOpen = action.payload
    },
    setChatContainerHeight: (ui, action: PayloadAction<string>) => {
      ui.chatContainerHeight = action.payload
    },
    setSearchComponent: (ui, action: PayloadAction<UISearchState>) => {
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

export const getIsSearchActive = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.search.searchActive
)

export const getCreateGroupActive = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.createGroup.active
)

export const getShowRegisterComponent = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.authentication.showRegisterComponent
)

export const getShowLoginComponent = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.authentication.showLoginComponent
)

export const getShowForgotPasswordComponent = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.authentication.showForgotPasswordComponent
)

export const {
  setShowRegisterComponent,
  setShowLoginComponent,
  setShowForgotPasswordComponent,
  setChatComponentState,
  setIsMobile,
  setConversationOpen,
  setCreateGroupComponent,
  setSearchComponent,
  setChatContainerHeight,
  toggleCreateGroupActive,
} = slice.actions

export default slice.reducer
