import { Box, CircularProgress } from "@mui/material";

interface LoadingSpinnerProps {
  size?: number;
  fullScreen?: boolean;
  color?: string;
}

const LoadingSpinner = ({
  size = 40,
  fullScreen = false,
  color = "#252728",
}: LoadingSpinnerProps) => {
  if (fullScreen) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(0, 0, 0, 0.5)",
          zIndex: 9999,
        }}
      >
        <CircularProgress size={size} sx={{ color }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 3,
      }}
    >
      <CircularProgress size={size} sx={{ color }} />
    </Box>
  );
};

export default LoadingSpinner;