import * as React from "react";

import { Typography, LinearProgress, Button } from "@material-ui/core";
import { Form, Formik, FormikHelpers } from "formik";
import { useSelector } from "react-redux";

import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import {
  defaultUserInfo,
  schema,
} from "features/users/helpers/update-profile.helper";
import { getUser, updateUser } from "features/users/redux/user.slice";
import { UpdateUserInput } from "features/users/types/user.types";
import { RootState } from "redux/rootReducer";
import { useAppDispatch } from "redux/store";

import { useStyles } from "./UpdateProfile.styles";

const UpdateProfileForm: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const classes = useStyles();

  React.useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const updateProfileHandler = async (
    values: UpdateUserInput,
    { setSubmitting }: FormikHelpers<UpdateUserInput>
  ) => {
    setSubmitting(true);
    dispatch(updateUser(values));
    setSubmitting(false);
  };

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Update Profile
      </Typography>
      <Formik<UpdateUserInput>
        initialValues={user.info || defaultUserInfo}
        enableReinitialize
        validateOnMount
        validationSchema={schema}
        onSubmit={updateProfileHandler}
      >
        {({ dirty, isValid, isSubmitting, submitForm, resetForm }) => {
          return (
            <Form noValidate className={classes.form}>
              <FormikTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="color"
                label="Color"
                name="color"
                autoFocus
              />
              <FormikTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="name"
                label="Name"
                id="name"
              />
              <FormikTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="pantone_value"
                label="Pantone value"
                id="pantone_value"
              />
              <FormikTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="year"
                label="Year"
                id="year"
                type="number"
              />
              {(isSubmitting || user.loading) && <LinearProgress />}
              <Button
                disabled={!(dirty && isValid) || isSubmitting}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => resetForm()}
              >
                Discard
              </Button>
              <Button
                disabled={!(dirty && isValid) || isSubmitting}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={submitForm}
              >
                Save
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UpdateProfileForm;
