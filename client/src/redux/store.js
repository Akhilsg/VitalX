import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import progressReducer from "./slices/progressSlice";
import analyticsReducer from "./slices/analyticsSlice";
import nutritionReducer from "./slices/nutritionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    progress: progressReducer,
    analytics: analyticsReducer,
    nutrition: nutritionReducer,
  },
});
