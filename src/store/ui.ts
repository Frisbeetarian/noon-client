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
  particlesInitialized: boolean
  rateLimited: UIRateLimitState
}

interface UISearchState {
  searchActive: boolean
  containerDisplay?: string
  containerHeight?: string
  inputPadding?: string
}

interface UIAuthenticationState {
  showRegisterComponent: boolean
  showLoginComponent: boolean
  showForgotPasswordComponent: boolean
  isRegistering: boolean
  passwordPromptSubmitted: boolean
}

interface UICreateGroupState {
  active: boolean
}

interface UIRateLimitState {
  isRateLimited: boolean
  message: string
  retryAfter: number
  refresh: number
}

const initialState: UIState = {
  chatComponent: 'closed',
  createGroupComponentOpen: false,
  chatContainerHeight: '87.5vh',
  isMobile: false,
  isConversationOpen: false,
  particlesInitialized: false,
  rateLimited: {
    isRateLimited: false,
    message: '',
    retryAfter: 0,
    refresh: new Date().getTime(),
  },
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
    isRegistering: false,
    passwordPromptSubmitted: false,
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
    setParticlesInitialized: (state, action) => {
      state.particlesInitialized = action.payload
    },
    rateLimitDetected: (state, action: PayloadAction<UIRateLimitState>) => {
      state.rateLimited.isRateLimited = true
      state.rateLimited.message = action.payload.message
      state.rateLimited.retryAfter = action.payload.retryAfter
      state.rateLimited.refresh = action.payload.refresh
    },
    resetRateLimit: (state) => {
      state.rateLimited.isRateLimited = false
      state.rateLimited.message = ''
      state.rateLimited.retryAfter = 0
      state.rateLimited.refresh = new Date().getTime()
    },
    setIsRegistering: (state, action: PayloadAction<boolean>) => {
      state.authentication.isRegistering = action.payload
    },
    setPasswordPromptSubmitted: (state, action: PayloadAction<boolean>) => {
      state.authentication.passwordPromptSubmitted = action.payload
    },
    clearUIState: (_) => {
      return initialState
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

export const getParticlesInitialized = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.particlesInitialized
)

export const getRateLimited = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.rateLimited
)

export const getIsRegistering = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.authentication.isRegistering
)

export const getPasswordPromptSubmitted = createSelector(
  (state) => state.entities.ui,
  (ui) => ui.authentication.passwordPromptSubmitted
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
  setParticlesInitialized,
  rateLimitDetected,
  resetRateLimit,
  setIsRegistering,
  setPasswordPromptSubmitted,
  clearUIState,
} = slice.actions

export default slice.reducer
