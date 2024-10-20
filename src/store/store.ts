import { configureStore } from '@reduxjs/toolkit';
// Removed next-redux-wrapper import

import rootReducer from './reducer';
import { usersApiSlice } from './api/usersApiSlice';
import { conversationsApiSlice } from './api/conversationsApiSlice';
import rateLimitMiddleware from './middleware/rateLimitMiddleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApiSlice.middleware)
      .concat(conversationsApiSlice.middleware)
      .concat(rateLimitMiddleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
