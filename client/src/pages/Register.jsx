import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  registerStart,
  registerSuccess,
  registerFailure,
} from "../redux/slices/authSlice";
import registerImage from "../assets/register.png";
import Section from "../components/AuthSection";

const Register = () => {
  const dispatch = useDispatch();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(registerStart());

    try {
      await axios.post("http://localhost:5000/api/users/register", {
        fName,
        lName,
        email,
        password,
      });
      dispatch(registerSuccess());
      navigate("/login");
    } catch (error) {
      dispatch(
        registerFailure(error.response?.data?.message || "Error registering")
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Section
        title="Hi, Welcome Back"
        subtitle="Grow through personalized experiences"
        image="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/illustrations/illustration-dashboard.webp"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: "1 1 auto",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 16px",
        }}
      >
        <Box sx={{ width: "450px" }}>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              autoFocus
              id="fName"
              label="First Name"
              name="fName"
              autoComplete="fName"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              autoFocus
              id="lName"
              label="Last Name"
              name="lName"
              autoComplete="lName"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
            />
          </Box>
          <TextField
            margin="normal"
            required
            fullWidth
            autoFocus
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box sx={{ mt: 2 }}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
