import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z as zod } from "zod";
import { Field } from "../common/form";
import { Form } from "../common/form/form-provider";
import { RouterLink } from "../common/router-link";
import Section from "../components/AuthSection";
import { useBoolean } from "../hooks/use-boolean";
import { useRouter } from "../hooks/use-router";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/slices/authSlice";

const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Email must be a valid email address!" }),
  password: zod
    .string()
    .min(1, { message: "Password is required!" })
    .min(6, { message: "Password must be at least 6 characters!" }),
});

const baseUrl = process.env.REACT_APP_API_URL;

const Login = () => {
  const { error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const password = useBoolean();

  const methods = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    dispatch(loginStart());

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/login`,
        data
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      dispatch(
        loginSuccess({ token: response.data.token, user: response.data.user })
      );
      toast.success("Logged in successfully");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      dispatch(
        loginFailure(error.response?.data?.message || "Error logging in")
      );
    }
  });

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
          <Stack spacing={1.5} sx={{ mb: 5 }}>
            <Typography variant="h5">Sign in to your account</Typography>

            <Stack direction="row" spacing={0.5}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {`Don't have an account?`}
              </Typography>

              <Link component={RouterLink} href="/register" variant="subtitle2">
                Get started
              </Link>
            </Stack>
          </Stack>

          {!!error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Form methods={methods} onSubmit={onSubmit}>
            <Stack spacing={3}>
              <Field.Text
                name="email"
                label="Email address"
                InputLabelProps={{ shrink: true }}
              />
              <Stack spacing={1.5}>
                <Link
                  component={RouterLink}
                  href="#"
                  variant="body2"
                  color="inherit"
                  sx={{ alignSelf: "flex-end" }}
                >
                  Forgot password?
                </Link>
                <Field.Text
                  name="password"
                  label="Password"
                  placeholder="6+ characters"
                  type={password.value ? "text" : "password"}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={password.onToggle} edge="end">
                          <Icon
                            icon={
                              password.value
                                ? "solar:eye-bold"
                                : "solar:eye-closed-bold"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                loadingIndicator="Sign in..."
              >
                Sign in
              </LoadingButton>
            </Stack>
          </Form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
