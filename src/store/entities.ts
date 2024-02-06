import { combineReducers } from '@reduxjs/toolkit'

import usersReducer from './users'
import socketsReducer from './sockets'
import uiReducer from './ui'
import profilesReducer from './profiles'
import chatReducer from './chat'
import searchReducer from './search'
import groupsReducer from './groups'
import videoReducer from './video'
import filesReducer from './files'
import { conversationsApiSlice } from './api/conversationsApiSlice'

export default combineReducers({
  users: usersReducer,
  profiles: profilesReducer,
  sockets: socketsReducer,
  ui: uiReducer,
  chat: chatReducer,
  search: searchReducer,
  groups: groupsReducer,
  video: videoReducer,
  files: filesReducer,
  [conversationsApiSlice.reducerPath]: conversationsApiSlice.reducer,
})
