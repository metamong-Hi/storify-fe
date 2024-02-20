import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TextState {
  value: string;
  texts: string[];
  feedbackMessage: string;
}

const initialState: TextState = {
  value: '',
  texts: [],
  feedbackMessage: '', 
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
    setFeedbackMessage: (state, action) => { 
      state.feedbackMessage = action.payload;
    },
  },
});


export const { setText, addText, resetText, setFeedbackMessage } = textSlice.actions;

export default textSlice.reducer;
