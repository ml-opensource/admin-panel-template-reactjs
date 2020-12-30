import * as React from "react";

import { Typography, LinearProgress, Button } from "@material-ui/core";
import { Form, Formik, FormikHelpers } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { api } from "api/api";
import FormikTextField from "components/FormElements/FormikTextField/FormikTextField";
import {
  defaultUserInfo,
  schema,
} from "features/users/helpers/update-profile.helper";
import { UpdateUserInput, UserInfo } from "features/users/types/user.types";
import { Dispatch, RootState } from "store/store";

import { useStyles } from "./UpdateProfile.styles";

const UpdateProfileForm: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<Dispatch>();
  const [initialUserInfo, setInitialUserInfo] = React.useState<UserInfo>(
    user.info || defaultUserInfo
  );

  const classes = useStyles();

  React.useEffect(() => {
    const getUserInfo = async () => {
      const result = await api.get<{ data: UserInfo }>("/user/1");
      dispatch.user.setCurrentUser(result.data.data);
      setInitialUserInfo(result.data.data);
    };
    getUserInfo();
  }, [dispatch.user]);

  const updateProfileHandler = async (
    values: UpdateUserInput,
    { setSubmitting }: FormikHelpers<UpdateUserInput>
  ) => {
    setSubmitting(true);
    await dispatch.user.updateUserInfo(values);
    setInitialUserInfo({
      ...initialUserInfo,
      ...values,
    });
    setSubmitting(false);
  };

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Update Profile
      </Typography>
      <Formik<UpdateUserInput>
        initialValues={initialUserInfo}
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
              {isSubmitting && <LinearProgress />}
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
