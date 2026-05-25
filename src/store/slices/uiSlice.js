import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeModal: null,
  theme: 'dark',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { openModal, closeModal, setTheme } = uiSlice.actions;
export default uiSlice.reducer;
