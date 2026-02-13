import { Button, CircularProgress } from "@mui/material";
import { ButtonProps } from "@mui/material/Button";


interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export const LoadingButton = ({
  isLoading,
  loadingText,
  children,
  disabled,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      {...props}
      disabled={disabled || isLoading}
      startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : undefined}
    >
      {isLoading ? (loadingText || "Loading...") : children}
    </Button>
  );
};