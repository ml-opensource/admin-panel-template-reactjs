import * as React from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import { SwitchProps } from "@material-ui/core/Switch";
import { Field } from "formik";
import { Switch } from "formik-material-ui";

type FormikSwitchProps = Omit<SwitchProps, "name"> & {
  name: string;
  label?: string;
};

const FormikSwitch: React.FC<FormikSwitchProps> = ({
  name,
  label,
  ...rest
}) => {
  return (
    <FormControlLabel
      control={
        <Field component={Switch} type="checkbox" name={name} {...rest} />
      }
      label={label || name.charAt(0).toLocaleUpperCase() + name.substr(1)}
    />
  );
};

export default FormikSwitch;
