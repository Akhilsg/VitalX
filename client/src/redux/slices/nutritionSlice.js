import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nutritionPlan: null,
  preferences: {
    isVegetarian: false,
    isVegan: false,
    hasAllergies: false,
    allergies: [],
    excludedIngredients: [],
    preferredCuisines: [],
    calorieGoal: "",
    proteinGoal: "",
    carbGoal: "",
    fatGoal: "",
  },
  loading: false,
  generating: false,
  error: null,
};

const nutritionSlice = createSlice({
  name: "nutrition",
  initialState,
  reducers: {
    setNutritionPlan: (state, action) => {
      state.nutritionPlan = action.payload;
    },
    setPreferences: (state, action) => {
      state.preferences = action.payload;
    },
    updatePreference: (state, action) => {
      const { name, value } = action.payload;
      state.preferences[name] = value;
    },
    addPreferenceItem: (state, action) => {
      const { type, value } = action.payload;
      if (!state.preferences[type].includes(value)) {
        state.preferences[type].push(value);
      }
    },
    removePreferenceItem: (state, action) => {
      const { type, index } = action.payload;
      state.preferences[type] = state.preferences[type].filter(
        (_, i) => i !== index
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setGenerating: (state, action) => {
      state.generating = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetNutrition: () => initialState,
  },
});

export const {
  setNutritionPlan,
  setPreferences,
  updatePreference,
  addPreferenceItem,
  removePreferenceItem,
  setLoading,
  setGenerating,
  setError,
  resetNutrition,
} = nutritionSlice.actions;

export default nutritionSlice.reducer;
