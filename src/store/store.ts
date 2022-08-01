import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'
import logger from './middleware/logger'
// import func from './middleware/func'
import toast from './middleware/toast'
import api from './middleware/api'

// import { Action } from 'redux'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      // counter: {
      // count: state,
      // },
    }
  } else {
    return reducer
  }
}

const makeStore = () =>
  configureStore({
    reducer,
    // middleware: [...getDefaultMiddleware(), logger],
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
// export const selectSubject = (id) => (state) => state?.[subjectSlice.name]?.[id]
