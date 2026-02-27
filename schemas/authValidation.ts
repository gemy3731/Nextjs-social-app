import * as yup from "yup";

export const loginValidationSchema =yup.object().shape({
      email: yup.string().required("Email required").email("Invalid email"),
      password: yup
        .string()
        .required("Password required")
        .matches(
          /^[a-zA-Z0-9]{3,30}$/,
          "Incorrect Password"
        ),
    })

export const registerValidationSchema =yup.object().shape({
      name: yup
        .string()
        .required("Name required")
        .min(3, "Minimum name length is 3 characters")
        .max(15, "Maxmum name length is 15 characters"),
      email: yup.string().required("Email required").email("Invalid email"),
      password: yup
        .string()
        .required("Password required")
        .matches(
          /^[a-zA-Z0-9]{3,30}$/,
          "Password should contain at least 8 Characters => 1 capital letter, 1 small letter, 1 digit and 1 special character"
        ),
      rePassword: yup
        .string()
        .required("Repassword required")
        .oneOf([yup.ref("password")], "Repassword should match password"),
      dateOfBirth: yup.string().required("Date required"),
      gender: yup.string().required("Gender required"),
    })