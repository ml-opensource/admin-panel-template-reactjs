import * as React from "react";

import { FormGroup } from "@material-ui/core";
import { CheckboxProps } from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import { Field, useFormikContext } from "formik";
import { CheckboxWithLabel } from "formik-material-ui";

type CheckboxValue = string | number;

type CheckboxOption = {
  label: React.ReactNode;
  value: CheckboxValue;
};

type FormikCheckboxProps = Omit<CheckboxProps, "name"> & {
  name: string;
  helperText?: string;
  label?: string;
  options: CheckboxOption[];
  fullWidth?: boolean;
};

const FormikCheckbox: React.FC<FormikCheckboxProps> = ({
  helperText,
  name,
  label,
  options,
  fullWidth,
  ...rest
}) => {
  const { errors } = useFormikContext<never>();
  const fieldIsInvalid = Object.prototype.hasOwnProperty.call(errors, name);

  return (
    <FormControl
      fullWidth={fullWidth}
      component="fieldset"
      error={fieldIsInvalid}
    >
      <FormLabel component="legend">{label ?? name}</FormLabel>
      <FormGroup>
        {options.map(option => (
          <Field
            component={CheckboxWithLabel}
            {...rest}
            name={name}
            value={option.value}
            type="checkbox"
            Label={{ label: option.label }}
          />
        ))}
      </FormGroup>
      <FormHelperText>{helperText || errors[name]}</FormHelperText>
    </FormControl>
  );
};

export default FormikCheckbox;
