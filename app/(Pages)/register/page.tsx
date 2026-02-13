"use client";
import { useEffect } from "react";
import { Paper, Typography, Box } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/UseAuth";
import { registerValidationSchema } from "@/schemas/authValidation";
import { RegisterCredentials } from "@/types/auth.types";
import { ErrorAlert } from "@/_components/shared/Erroralert";
import { FormField } from "@/_components/shared/ui/Formfield";
import SelectField from "@/_components/shared/ui/SelectField";
import { LoadingButton } from "@/_components/shared/Loadingbutton";
export default function Register() {
  const router = useRouter();
  const { isLoading, error, register, isAuthenticated, clearError } = useAuth();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  const formik = useFormik<RegisterCredentials>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        await register(values);
      } catch (err) {
        console.error("Login error:", err);
      }
    },
    validationSchema: registerValidationSchema,
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
          Register
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
            name="name"
            label="Name"
            type="text"
            placeholder="Enter your name"
            formik={formik}
          />
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
          <FormField
            name="rePassword"
            label="Repeat Password"
            type="password"
            placeholder="Re-enter your password"
            formik={formik}
          />
          <FormField
            name="dateOfBirth"
            type="date"
            placeholder="Date of Birth"
            formik={formik}
          />

          <SelectField
            name="gender"
            label="Gender"
            formik={formik}
            items={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
            defaultValue="gender"
          />
          <Typography
            sx={{
              color: "white",
              mt: 1,
            }}
          >
            Already have an account?{" "}
            <Link
              href="/login"
              style={{
                color: "#3b82f6",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Login
            </Link>
          </Typography>

          <LoadingButton
            type="submit"
            variant="contained"
            isLoading={isLoading}
            loadingText="Registering..."
            sx={{
              width: "fit-content",
              ml: "auto",
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            Register
          </LoadingButton>
        </Box>
      </Paper>
    </Box>
  );
}
