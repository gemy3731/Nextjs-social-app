import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";

interface SelectFieldProps {
  name: string;
  label: string;
  //eslint-disable-next-line
  formik: FormikProps<any>;
  fullWidth?: boolean;
  items: { value: string; label: string }[];
  defaultValue?: string;
}

const SelectField = ({
  name,
  label,
  formik,
  fullWidth = true,
  items,
  defaultValue,
}: SelectFieldProps) => {
  const hasError = formik.touched[name] && Boolean(formik.errors[name]);
  const errorMessage = formik.touched[name] && formik.errors[name];
  return (
    <>
      <FormControl variant="outlined">
        <InputLabel id={label} sx={{ color: "white" }}>{label}</InputLabel>
        <Select
          labelId={label}
          id={label}
          defaultValue={defaultValue}
          name={name}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label={label}
          variant="outlined"
          fullWidth={fullWidth}
          error={hasError}
          sx={{
            color: "white",
            borderColor: hasError ? "red" : "gray",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: hasError ? "red" : "gray",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: hasError ? "red" : "gray",
            },
          }}
        >
          {items.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {hasError && (
        <Typography color="error" variant="body2" sx={{ mt: 0.5 }}>
          {errorMessage as string}
        </Typography>
      )}
    </>
  );
};

export default SelectField;
