import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import SvgIcon from "@mui/icons-material/FitnessCenter";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Icon
          icon="solar:dumbbell-large-minimalistic-broken"
          width="36"
          height="36"
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
          VitalX
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            onClick={() => navigate("/")}
            color={window.location.pathname === "/" ? "primary" : "inherit"}
          >
            Home
          </Button>
          <Button
            color={
              window.location.pathname === "protected" ? "primary" : "inherit"
            }
            onClick={() => navigate("/protected")}
          >
            Dashboard
          </Button>
          <Button
            color={
              window.location.pathname === "/workout" ? "primary" : "inherit"
            }
            onClick={() => navigate("/workout")}
          >
            Workout
          </Button>
          <Button
            color={
              window.location.pathname === "/nutrition" ? "primary" : "inherit"
            }
            onClick={() => navigate("/nutrition")}
          >
            Nutrition
          </Button>
          {isAuthenticated ? (
            <Button color="error">Logout</Button>
          ) : (
            <div>
              <Button
                color={
                  window.location.pathname === "/register"
                    ? "primary"
                    : "inherit"
                }
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
              <Button
                color={
                  window.location.pathname === "/login" ? "primary" : "inherit"
                }
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </div>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
