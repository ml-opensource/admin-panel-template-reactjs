import * as React from "react";

import { createStyles, makeStyles, MenuItem } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import { SelectProps } from "@material-ui/core/Select";
import { Field, useFormikContext } from "formik";
import { Select } from "formik-material-ui";

type SelectOptionValue = string | number;

type SelectOption = {
  label: React.ReactNode;
  value: SelectOptionValue;
};

type FormikSelectProps = Omit<SelectProps, "name"> & {
  options: SelectOption[];
  name: string;
  helperText?: string;
  loadMore?: () => Promise<void> | void;
};

const useStyles = makeStyles(theme =>
  createStyles({
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    menuPaper: {
      maxHeight: 200,
    },
  })
);

const FormikSelect: React.FC<FormikSelectProps> = ({
  options,
  label,
  name,
  helperText,
  fullWidth,
  loadMore,
  ...rest
}) => {
  const classes = useStyles();
  const { errors } = useFormikContext<never>();
  const fieldIsInvalid = Object.prototype.hasOwnProperty.call(errors, name);

  const handleSelectScroll = (event: Event) => {
    const target = event.target as Element;
    const isScrollToBottom =
      target.scrollHeight - target.scrollTop === target.clientHeight;
    if (isScrollToBottom && loadMore) {
      loadMore();
    }
  };

  return (
    <FormControl
      component="fieldset"
      error={fieldIsInvalid}
      fullWidth={fullWidth}
    >
      <InputLabel htmlFor={name}>{label ?? name}</InputLabel>
      <Field
        component={Select}
        {...rest}
        name={name}
        MenuProps={{
          classes: { paper: classes.menuPaper },
          disableScrollLock: true,
          onScroll: handleSelectScroll,
        }}
      >
        {options.map(option => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </Field>
      <FormHelperText>{helperText || errors[name]}</FormHelperText>
    </FormControl>
  );
};

export default FormikSelect;
