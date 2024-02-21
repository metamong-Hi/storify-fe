
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  notifications: any[]; 
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<any[]>) => {
      state.notifications = action.payload;
    },
  },
});


export const { setNotifications } = notificationSlice.actions;


export default notificationSlice.reducer;
