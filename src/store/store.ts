import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'
import { createWrapper } from 'next-redux-wrapper'
import { apiSlice } from './api/apiSlice'

const makeStore = () =>
  configureStore({
    reducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
// export type RootState = ReturnType<typeof makeStore().getState>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
