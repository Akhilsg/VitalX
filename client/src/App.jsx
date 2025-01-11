import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { domMax, LazyMotion } from "framer-motion";
import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { store } from "./redux/store";
import Navbar from "./Navbar";
import LoadingScreen from "./LoadingScreen";
import { Snackbar } from "./common/snackbar";
import theme from "./theme/theme";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";

const LazyRegister = lazy(() => import("./pages/Register"));
const LazyLogin = lazy(() => import("./pages/Login"));
const LazyDashboard = lazy(() => import("./pages/Dashboard"));
const LazyWorkoutPlan = lazy(() => import("./pages/WorkoutPlan"));
const LazyNutritionTips = lazy(() => import("./pages/NutritionPlan"));

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <LazyMotion strict features={domMax}>
            <CssBaseline />
            <Navbar />
            <Snackbar />
            <Suspense fallback={<LoadingScreen />}>
              <Box sx={{ padding: 3 }}>
                <Routes>
                  <Route path="/register" element={<LazyRegister />} />
                  <Route path="/login" element={<LazyLogin />} />
                  <Route
                    path="/protected"
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
                    path="/nutrition"
                    element={
                      <PrivateRoute>
                        <LazyNutritionTips />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/" element={<Home />} />
                </Routes>
              </Box>
            </Suspense>
          </LazyMotion>
        </ThemeProvider>
      </Router>
    </Provider>
  );
};

export default App;
