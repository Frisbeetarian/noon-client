import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer'
import { createWrapper } from 'next-redux-wrapper'
// import { apiSlice } from './api/apiSlice'
import { conversationsApiSlice } from './api/conversationsApiSlice'
const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(conversationsApiSlice.middleware),
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
// export type RootState = ReturnType<typeof makeStore().getState>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
