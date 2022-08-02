import { combineReducers } from 'redux'
import usersReducer from './users'
import bugsReducer from './bugs'
import projectsReducer from './projects'
import communitiesReducer from './communities'

export default combineReducers({
  // bugs: bugsReducer,
  // projects: projectsReducer,
  users: usersReducer,
  communities: communitiesReducer,
})
