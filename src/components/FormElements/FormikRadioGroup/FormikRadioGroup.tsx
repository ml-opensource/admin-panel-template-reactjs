import * as React from "react";

import { FormControl } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import { RadioGroupProps } from "@material-ui/core/RadioGroup";
import { Field, useFormikContext } from "formik";
import { RadioGroup } from "formik-material-ui";

type RadioValue = string | number;

type RadioOption = {
  label: React.ReactNode;
  value: RadioValue;
};

type FormikRadioGroupProps = Omit<RadioGroupProps, "name"> & {
  options: RadioOption[];
  name: string;
  helperText?: string;
  isSubmitting: boolean;
  label?: string;
  fullWidth?: boolean;
};

const FormikRadioGroup: React.FC<FormikRadioGroupProps> = ({
  name,
  options,
  helperText,
  isSubmitting,
  label,
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
      <Field component={RadioGroup} name={name} {...rest}>
        {options.map(option => (
          <FormControlLabel
            value={option.value}
            control={<Radio disabled={isSubmitting} />}
            label={option.label}
            disabled={isSubmitting}
          />
        ))}
      </Field>
      <FormHelperText>{helperText || errors[name]}</FormHelperText>
    </FormControl>
  );
};

export default FormikRadioGroup;
