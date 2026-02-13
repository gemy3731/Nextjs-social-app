import { TextField, Typography } from "@mui/material";
import { FormikProps } from "formik";

interface FormFieldProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  //eslint-disable-next-line
  formik: FormikProps<any>;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
}

export const FormField = ({
  name,
  label,
  type = "text",
  placeholder,
  formik,
  fullWidth = true,
  multiline = false,
  rows,
}: FormFieldProps) => {
  const hasError = formik.touched[name] && Boolean(formik.errors[name]);
  const errorMessage = formik.touched[name] && formik.errors[name];

  return (
    <>
      <TextField
        id={name}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        label={label}
        variant="outlined"
        placeholder={placeholder}
        type={type}
        fullWidth={fullWidth}
        multiline={multiline}
        rows={rows}
        error={hasError}
        sx={{
          input: { color: "white", "&::placeholder": { color: "gray" } },
          textarea: { color: "white" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: hasError ? "error.main" : "rgba(255, 255, 255, 0.23)",
            },
            "&:hover fieldset": {
              borderColor: hasError ? "error.main" : "rgba(255, 255, 255, 0.5)",
            },
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px transparent inset",
            WebkitTextFillColor: "white",
            transition: "background-color 5000s ease-in-out 0s",
          },
        }}
        InputLabelProps={{ 
          className: "!text-white",
          sx: { color: hasError ? "error.main" : "white" }
        }}
      />
      {hasError && (
        <Typography color="error" variant="body2" sx={{ mt: 0.5 }}>
          {errorMessage as string}
        </Typography>
      )}
    </>
  );
};