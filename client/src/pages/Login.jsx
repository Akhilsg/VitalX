import { Box, Button, Card, CardContent, CardMedia, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.png";
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { toast } from "sonner";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      dispatch(loginSuccess({ token: response.data.token, user: response.data.user }));
      toast.success("Logged in successfully");
      navigate("/protected");
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || "Error logging in"));
    }
  };

  return (
    <Box
      sx={{
        margin: 0, display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <Card
        sx={{
          display: "flex",
          maxWidth: { lg: "55%", md: "85%" },
        }}
      >
        <form onSubmit={handleLogin} noValidate>
          <CardContent sx={{ flex: "1 0 auto", padding: 3 }}>
            <Box sx={{ mt: 1 }}>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              {error && <Typography color="error">{error}</Typography>}
              <br />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mt: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button type="submit" variant="contained" fullWidth loading={loading}>
                Login
              </Button>
            </Box>
          </CardContent>
        </form>
        <CardMedia
          component="img"
          sx={{ width: 400, display: { md: "block", xs: "none" } }}
          image={loginImage}
          alt="login to your account"
        />
      </Card>
    </Box>
  );
};

export default Login;

