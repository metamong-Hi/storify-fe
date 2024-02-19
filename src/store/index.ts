
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import textReducer from './textSlice';
import bookReducer from './bookSlice';
import themeReducer from './themeSlice';
import fontReducer from './fontSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    text: textReducer,
    book: bookReducer,
    theme: themeReducer,
    font: fontReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
