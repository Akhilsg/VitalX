import { Box } from "@mui/material";
import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { LoadingScreen } from "./loading/splash";
import Navbar from "./navbar/Navbar";
import Home from "./pages/Home";
import { store } from "./redux/store";

const LazyRegister = lazy(() => import("./pages/Register"));
const LazyLogin = lazy(() => import("./pages/Login"));
const LazyDashboard = lazy(() => import("./pages/Dashboard"));
const LazyWorkoutPlan = lazy(() => import("./pages/WorkoutPlan"));
const LazyAnalytics = lazy(() => import("./pages/Analytics"));
const LazyNutrition = lazy(() => import("./pages/Nutrition"));

const App = () => {
  return (
    <Provider store={store}>
      <Navbar />
      <Suspense fallback={<LoadingScreen />}>
        <Box>
          <Routes>
            <Route path="/register" element={<LazyRegister />} />
            <Route path="/login" element={<LazyLogin />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <LazyDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/workout"
              element={
                <PrivateRoute>
                  <LazyWorkoutPlan />
                </PrivateRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <PrivateRoute>
                  <LazyAnalytics />
                </PrivateRoute>
              }
            />
            <Route
              path="/nutrition"
              element={
                <PrivateRoute>
                  <LazyNutrition />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Home />} />
          </Routes>
        </Box>
      </Suspense>
    </Provider>
  );
};

export default App;
