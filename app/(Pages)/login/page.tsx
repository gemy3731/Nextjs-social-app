"use client";
import { useEffect } from "react";
import { Paper, Typography, Box } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/UseAuth";
import { LoginCredentials } from "@/types/auth.types";
import { loginValidationSchema } from "@/schemas/authValidation";
import { ErrorAlert } from "@/_components/shared/Erroralert";
import { LoadingButton } from "@/_components/shared/Loadingbutton";
import { FormField } from "@/_components/shared/ui/Formfield";

export default function Login() {
  const router = useRouter();
  const { isLoading, error, login, isAuthenticated, clearError } = useAuth();

  useEffect(() => {
    if (isAuthenticated()) {
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
    sx={{
      width: { xs: "90%", sm: "80%", md: "50%" },
      mx: "auto",
      mt: { xs: 12, md: 16 },
      mb: 4,
    }}
  >

    <ErrorAlert error={error} onClose={clearError} />

    <Paper
      elevation={3}
      sx={{
        p: { xs: 3, md: 4 },
        backgroundColor: "#252728",
        borderRadius: 2,
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        sx={{
          color: "white",
          mb: 3,
          fontWeight: 600,
        }}
      >
        Login Now
      </Typography>

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
    </Paper>
  </Box>
  );
}
