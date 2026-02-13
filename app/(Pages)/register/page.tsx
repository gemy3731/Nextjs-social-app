"use client";
import RegisterForm from "@/_components/auth/RegisterForm";
import { ErrorAlert } from "@/_components/shared/Erroralert";
import { useAuth } from "@/hooks/UseAuth";
import { Box, Paper, Typography } from "@mui/material";

export default function Register() {
  const { isLoading, error, register, isAuthenticated, clearError } = useAuth();
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

        <RegisterForm register={register} isLoading={isLoading} isAuthenticated={isAuthenticated} />
      </Paper>
    </Box>
  );
}
