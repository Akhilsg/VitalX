import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  metrics: [],
  workoutStats: null,
  aiAnalysis: null,
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    fetchMetricsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMetricsSuccess: (state, action) => {
      state.loading = false;
      state.metrics = action.payload;
    },
    fetchMetricsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addMetricStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addMetricSuccess: (state, action) => {
      state.loading = false;
      state.metrics = [action.payload, ...state.metrics];
    },
    addMetricFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchWorkoutStatsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWorkoutStatsSuccess: (state, action) => {
      state.loading = false;
      state.workoutStats = action.payload;
    },
    fetchWorkoutStatsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchAiAnalysisStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAiAnalysisSuccess: (state, action) => {
      state.loading = false;
      state.aiAnalysis = action.payload;
    },
    fetchAiAnalysisFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchMetricsStart,
  fetchMetricsSuccess,
  fetchMetricsFailure,
  addMetricStart,
  addMetricSuccess,
  addMetricFailure,
  fetchWorkoutStatsStart,
  fetchWorkoutStatsSuccess,
  fetchWorkoutStatsFailure,
  fetchAiAnalysisStart,
  fetchAiAnalysisSuccess,
  fetchAiAnalysisFailure,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
