import { combineReducers } from 'redux'
import usersReducer from './users'
import bugsReducer from './bugs'
import projectsReducer from './projects'
import communitiesReducer from './communities'
import socketsReducer from './sockets'
import uiReducer from './ui'
import profilesReducer from './profiles'
import chatReducer from './chat'
import searchReducer from './search'
import groupsReducer from './groups'

export default combineReducers({
  // bugs: bugsReducer,
  // projects: projectsReducer,
  users: usersReducer,
  profiles: profilesReducer,
  communities: communitiesReducer,
  sockets: socketsReducer,
  ui: uiReducer,
  chat: chatReducer,
  search: searchReducer,
  groups: groupsReducer,
})
