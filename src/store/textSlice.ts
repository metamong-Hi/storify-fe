import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TextState {
  value: string;
  texts: string[];
}

const initialState: TextState = {
  value: '',
  texts: [],
};

export const textSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    addText: (state, action: PayloadAction<string>) => {
      state.texts.push(action.payload);
    },
    resetText: (state) => {
      state.value = '';
      state.texts = [];
    },
  },
});


export const { setText, addText, resetText } = textSlice.actions;

export default textSlice.reducer;
