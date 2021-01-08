import React, { FC, useState } from "react";
import { Formik, Field } from "formik";
import {
  Button,
  LinearProgress,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { TextField, Select } from "formik-material-ui";
import * as yup from "yup";
import FormContainer from "components/FormContainer/FormContainer";

export interface FormData {
  email?: string;
  password?: string;
  select?: string;
}

const FormSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().min(8, "Password too short!").required("Required"),
});

type FormProps<TData> = {
  mode: "update" | "create";
  data?: TData;
  user: any;
};

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 224,
    },
  },
};

const ExampleScreen: FC<FormProps<FormData>> = ({ mode, data = {}, user }) => {
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

  const handleChange = (values: object) => {
    if (values !== data) {
      if (!window.confirm("Confirm to discard changes?")) {
        throw new Error("Cancel reset");
      }
    }
  };

  const scrollSelect = (e: any) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      // load more
      setNames(
        names.concat([
          "Oliver Hansen 1",
          "Van Henry 1",
          "April Tucker 1",
          "Ralph Hubbard 1",
        ])
      );
    }
  };

  return (
    <Formik<FormData>
      initialValues={user}
      validationSchema={FormSchema}
      onSubmit={(values, { setSubmitting }) => {
        // handle submit
        if (values !== "") {
          alert("Submit form success!");
          setTimeout(() => {
            setSubmitting(false);
          }, 500);
        }
      }}
      enableReinitialize
      initialStatus={
        mode === "update" && !Object.keys(data).length ? "loading" : "ready"
      }
    >
      {({ submitForm, isSubmitting, values }) => (
        <FormContainer>
          <h3>example form</h3>
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
        </FormContainer>
      )}
    </Formik>
  );
};

export default ExampleScreen;
