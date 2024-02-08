import { combineReducers } from 'redux'
import entitiesReducer from './entities'
import { conversationsApiSlice } from './api/conversationsApiSlice'
import { usersApiSlice } from './api/usersApiSlice'

export default combineReducers({
  entities: entitiesReducer,
  [usersApiSlice.reducerPath]: usersApiSlice.reducer,
  [conversationsApiSlice.reducerPath]: conversationsApiSlice.reducer,
})
