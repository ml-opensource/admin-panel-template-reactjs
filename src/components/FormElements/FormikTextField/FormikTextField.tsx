import * as React from "react";

import { TextFieldProps } from "@material-ui/core/TextField";
import { Field } from "formik";
import { TextField } from "formik-material-ui";

type FormikTextFieldProps = Omit<TextFieldProps, "name"> & {
  name: string;
  helperText?: string;
};

const FormikTextField: React.FC<FormikTextFieldProps> = ({ name, ...rest }) => (
  <Field component={TextField} {...rest} name={name} />
);

export default FormikTextField;
