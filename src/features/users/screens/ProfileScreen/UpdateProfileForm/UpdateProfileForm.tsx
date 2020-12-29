import * as React from "react";

import {
  Typography,
  TextField,
  LinearProgress,
  Button,
} from "@material-ui/core";
import { Formik, Field, FormikHelpers } from "formik";

import { schema } from "features/users/helpers/update-profile.helper";
import { UpdateUserInput } from "features/users/types/user.types";

import { useStyles } from "./UpdateProfile.styles";

type UpdateProfileFormProps = {
  endpoint: string;
};

const UpdateProfileForm: React.FC<UpdateProfileFormProps> = () => {
  const classes = useStyles();

  const updateProfileHandler = (
    values: UpdateUserInput,
    { setSubmitting }: FormikHelpers<UpdateUserInput>
  ) => {
    // To see the linear loading component
    setTimeout(() => {
      setSubmitting(false);
    }, 3000);
  };

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Update Profile
      </Typography>
      <Formik<UpdateUserInput>
        initialValues={{}}
        validationSchema={schema}
        onSubmit={updateProfileHandler}
      >
        {({ handleSubmit, dirty, isValid, isSubmitting, errors }) => {
          console.log({ errors });
          return (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoFocus
              />
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="firstName"
                label="First name"
                id="firstName"
              />
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="lastName"
                label="Last name"
                id="lastName"
              />
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="avatar"
                label="Avatar"
                id="avatar"
              />
              {isSubmitting && <LinearProgress />}
              <Button
                disabled={!(dirty && isValid) || isSubmitting}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Save
              </Button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UpdateProfileForm;
