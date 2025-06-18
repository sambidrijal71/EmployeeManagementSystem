import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'uiSlice',
  initialState: {
    darkMode: true,
    openEditModal: false,
    openDeleteModal: false,
    openModal: false,
  },
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    setOpenEditModal: (state, action) => {
      state.openEditModal = action.payload;
    },
    setOpenDeleteModal: (state, action) => {
      state.openDeleteModal = action.payload;
    },
    setOpenModal: (state, action) => {
      state.openModal = action.payload;
    },
  },
});

export const {
  setDarkMode,
  setOpenDeleteModal,
  setOpenEditModal,
  setOpenModal,
} = uiSlice.actions;
