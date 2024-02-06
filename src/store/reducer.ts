import { combineReducers } from 'redux'
import entitiesReducer from './entities'
import { apiSlice } from './api/apiSlice'

export default combineReducers({
  entities: entitiesReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
})
