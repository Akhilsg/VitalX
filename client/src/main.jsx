import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { domMax, LazyMotion } from "framer-motion";
import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./global.css";
import { ProgressBar } from "./loading/progress-bar";
import { SplashScreen } from "./loading/splash";
import theme from "./theme/theme.jsx";
import { Snackbar } from "./common/snackbar/Snackbar.jsx";

const LazyApp = lazy(() => import("./App.jsx"));

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <CssBaseline />
      <ProgressBar />
      <Snackbar />

      <LazyMotion strict features={domMax}>
        <Suspense fallback={<SplashScreen />}>
          <StrictMode>
            <LazyApp />
          </StrictMode>
        </Suspense>
      </LazyMotion>
    </BrowserRouter>
  </ThemeProvider>
);
