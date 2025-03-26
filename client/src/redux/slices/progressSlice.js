import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProgress: null,
  loading: false,
  error: null,
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    initializeProgressStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    initializeProgressSuccess: (state, action) => {
      state.loading = false;
      state.userProgress = action.payload;
    },
    initializeProgressFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSetSuccess: (state, action) => {
      state.userProgress = action.payload;
    },
    markWorkoutComplete: (state, action) => {
      state.userProgress = action.payload;
    },
  },
});

export const {
  initializeProgressStart,
  initializeProgressSuccess,
  initializeProgressFailure,
  updateSetSuccess,
  markWorkoutComplete,
} = progressSlice.actions;

export default progressSlice.reducer;
