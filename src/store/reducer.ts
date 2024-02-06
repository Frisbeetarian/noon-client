import { combineReducers } from 'redux'
import entitiesReducer from './entities'
import { conversationsApiSlice } from './api/conversationsApiSlice'

export default combineReducers({
  entities: entitiesReducer,
  [conversationsApiSlice.reducerPath]: conversationsApiSlice.reducer,
})
