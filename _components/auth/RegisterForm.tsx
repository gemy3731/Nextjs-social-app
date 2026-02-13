"use client";

import { registerValidationSchema } from "@/schemas/authValidation";
import { AuthResponse, RegisterCredentials } from "@/types/auth.types";
import { Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormField } from "../shared/ui/Formfield";
import SelectField from "../shared/ui/SelectField";
import Link from "next/link";
import { LoadingButton } from "../shared/Loadingbutton";
 
interface RegisterFormProps {
  register: (credentials: RegisterCredentials) => Promise<AuthResponse>;
  isAuthenticated: () => boolean;
  isLoading: boolean;
}
const RegisterForm = ({ register, isAuthenticated, isLoading }: RegisterFormProps) => {
  const router = useRouter();

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
  );
};

export default RegisterForm;
