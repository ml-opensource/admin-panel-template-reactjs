/* eslint-disable */
import React, { FC, useState } from "react";
import { Formik, Field } from "formik";
import {
  Button,
  LinearProgress,
  MenuItem,
  Snackbar,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { TextField, Select } from "formik-material-ui";
import * as yup from "yup";
import FormContainer from "components/FormContainer/FormContainer";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";

export interface FormData {
  email?: string;
  password?: string;
  select?: string;
  //etc...
}

const FormSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().min(8, "Password too short!").required("Required"),
  //etc...
});

type FormCustomProps<TData> = {
  mode: "update" | "create";
  data?: TData;
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 200,
    },
  })
);

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 224,
    },
  },
};

const FormCustom: FC<FormCustomProps<FormData>> = ({ mode, data = {} }) => {
  const [names, setNames] = useState<string[]>([
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ]);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();

  const handleChange = (values: object) => {
    if (values != data) {
      if (!window.confirm("Confirm to discard changes?")) {
        throw new Error("Cancel reset");
      }
    }
  };

  const scrollSelect = (e: any) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      //load more
    }
  };

  return (
    <Formik<FormData>
      initialValues={{
        email: "",
        password: "",
        select: "",
      }}
      validationSchema={FormSchema}
      onSubmit={(values, { setSubmitting }) => {
        // handle submit
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      }}
      enableReinitialize={true}
      initialStatus={
        mode === "update" && !Object.keys(data).length ? "loading" : "ready"
      }
    >
      {({ submitForm, isSubmitting, values }) => (
        <FormContainer>
          <Field
            component={TextField}
            name="email"
            type="email"
            label="Email"
          />
          <br />
          <Field
            component={TextField}
            name="password"
            type="password"
            label="Password"
          />
          <br />

          <InputLabel htmlFor="age-simple">Select</InputLabel>
          <Field
            component={Select}
            name="select"
            MenuProps={MenuProps}
            onScroll={scrollSelect}
          >
            {names.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Field>
          <br />

          {isSubmitting && <LinearProgress />}
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Submit
          </Button>
          <Button
            disabled={isSubmitting}
            color="secondary"
            variant="contained"
            type="reset"
            onClick={() => handleChange(values)}
          >
            Cancel
          </Button>
          <Snackbar open={open} autoHideDuration={2000}>
            <Alert severity="success">Submit success!</Alert>
          </Snackbar>
        </FormContainer>
      )}
    </Formik>
  );
};

export default FormCustom;
