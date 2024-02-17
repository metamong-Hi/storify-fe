import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FontState {
  selectedFontClass: string;
}

const initialState: FontState = {
  selectedFontClass: 'font-default',
};

export const fontSlice = createSlice({
  name: 'font',
  initialState,
  reducers: {
    setFont: (state, action: PayloadAction<string>) => {
      state.selectedFontClass = action.payload;
    },
  },
});

export const { setFont } = fontSlice.actions;

export default fontSlice.reducer;
