import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import textReducer from './textSlice';
import bookReducer from './bookSlice';
import themeReducer from './themeSlice';
import fontReducer from './fontSlice';
import notificationReducer from './notificationSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    text: textReducer,
    book: bookReducer,
    theme: themeReducer,
    font: fontReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
