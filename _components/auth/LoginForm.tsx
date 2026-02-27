"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { LoadingButton } from "../shared/Loadingbutton";
import { FormField } from "../shared/ui/Formfield";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { loginValidationSchema } from "@/schemas/authValidation";
import { useFormik } from "formik";
import { AuthResponse, LoginCredentials } from "@/types/auth.types";

interface LoginFormProps {
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  isAuthenticated: boolean;
  isLoading: boolean;
}
const LoginForm = ({ login, isAuthenticated, isLoading }: LoginFormProps) => {
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  const formik = useFormik<LoginCredentials>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        await login(values);
      } catch (err) {
        console.error("Login error:", err);
      }
    },
  });
  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
      }}
    >
      <FormField
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        formik={formik}
      />

      <FormField
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        formik={formik}
      />

      <Typography
        sx={{
          color: "white",
          mt: 1,
        }}
      >
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          style={{
            color: "#3b82f6",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Sign up
        </Link>
      </Typography>

      <LoadingButton
        type="submit"
        variant="contained"
        isLoading={isLoading}
        loadingText="Logging in..."
        sx={{
          width: "fit-content",
          ml: "auto",
          px: 4,
          py: 1.5,
          textTransform: "none",
          fontSize: "1rem",
        }}
      >
        Login
      </LoadingButton>
    </Box>
  );
};

export default LoginForm;
