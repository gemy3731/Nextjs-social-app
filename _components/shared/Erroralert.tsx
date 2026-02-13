import { Alert, AlertTitle, Collapse } from "@mui/material";


interface ErrorAlertProps {
  error: string | null;
  title?: string;
  onClose?: () => void;
}

export const ErrorAlert = ({ 
  error, 
  title = "Error", 
  onClose 
}: ErrorAlertProps) => {
  return (
    <Collapse in={Boolean(error)}>
      <Alert 
        severity="error" 
        onClose={onClose}
        sx={{ mb: 2 }}
      >
        <AlertTitle>{title}</AlertTitle>
        {error}
      </Alert>
    </Collapse>
  );
};