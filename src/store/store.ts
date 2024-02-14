import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import rootReducer from './reducer'
import { usersApiSlice } from './api/usersApiSlice'
import { conversationsApiSlice } from './api/conversationsApiSlice'
import rateLimitMiddleware from './middleware/rateLimitMiddleware'

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(usersApiSlice.middleware)
        .concat(conversationsApiSlice.middleware)
        .concat(rateLimitMiddleware),
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
// export type RootState = ReturnType<typeof makeStore().getState>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
