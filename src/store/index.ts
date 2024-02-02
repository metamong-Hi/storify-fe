
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import textReducer from './textSlice';
import bookReducer from './bookSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    text: textReducer,
    book: bookReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
