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
  useTheme,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z as zod } from "zod";
import api from "../api/axios";
import { Field } from "../common/form";
import { Form } from "../common/form/form-provider";
import { RouterLink } from "../common/router-link";
import Section from "../components/AuthSection";
import { useBoolean } from "../hooks/use-boolean";
import {
  registerFailure,
  registerStart,
  registerSuccess,
} from "../redux/slices/authSlice";

const RegisterSchema = zod.object({
  fName: zod.string().min(1, { message: "First name is required!" }),
  lName: zod.string().min(1, { message: "Last name is required!" }),
  email: zod
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Email must be a valid email address!" }),
  password: zod
    .string()
    .min(1, { message: "Password is required!" })
    .min(6, { message: "Password must be at least 6 characters!" }),
});

const Register = () => {
  const { error } = useSelector((state) => state.auth);

  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const password = useBoolean();

  const methods = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fName: "",
      lName: "",
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    dispatch(registerStart());

    try {
      await api.post(`/users/register`, data);
      dispatch(registerSuccess());
      toast.success("Registered successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      dispatch(
        registerFailure(error.response?.data?.message || "Error registering")
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
            <Typography variant="h5">Get started absolutely free</Typography>

            <Stack direction="row" spacing={0.5}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {`Already have an account?`}
              </Typography>

              <Link component={RouterLink} href="/login" variant="subtitle2">
                Login
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
              <Stack direction="row" spacing={2}>
                <Field.Text
                  name="fName"
                  label="First Name"
                  InputLabelProps={{ shrink: true }}
                />
                <Field.Text
                  name="lName"
                  label="Last Name"
                  InputLabelProps={{ shrink: true }}
                />
              </Stack>
              <Field.Text
                name="email"
                label="Email address"
                InputLabelProps={{ shrink: true }}
              />
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
              <LoadingButton
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                loadingIndicator="Registering..."
              >
                Create Account
              </LoadingButton>
              <Box
                component={Typography}
                variant="caption"
                color="text.secondary"
                align="center"
              >
                By signing up, I agree to{" "}
                <Link
                  color="textPrimary"
                  underline="hover"
                  sx={{
                    textDecoration: "underline",
                    textDecorationColor: theme.palette.action.disabled,
                  }}
                >
                  Terms of service
                </Link>
                &nbsp;and&nbsp;
                <Link
                  color="textPrimary"
                  underline="hover"
                  sx={{
                    textDecoration: "underline",
                    textDecorationColor: theme.palette.action.disabled,
                  }}
                >
                  Privacy Policy
                </Link>
                .
              </Box>
            </Stack>
          </Form>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
