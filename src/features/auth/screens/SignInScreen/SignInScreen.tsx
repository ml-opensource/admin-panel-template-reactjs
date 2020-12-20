import React, { FC, memo } from "react";

import {
  Avatar,
  Typography,
  Button,
  Grid,
  Link as MatLink,
  LinearProgress,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Formik, Field } from "formik";
import { TextField } from "formik-material-ui";
import { Link } from "react-router-dom";

import { initFormValue, schema } from "../../helpers/sign-in.helpers";
import { useStyles } from "./SignInScreen.styles";

/**
 * SignIn Screen
 */
const SignInScreen: FC = () => {
  const classes = useStyles();

  /**
   * Login handler with user credentials
   * @param values
   * @param setSubmitting
   */
  const loginHandler = (values: any, { setSubmitting }: any) => {
    // To see the linear loading component
    setTimeout(() => {
      setSubmitting(false);
    }, 3000);
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        SignIn Screen
      </Typography>
      <Formik
        initialValues={initFormValue}
        validationSchema={schema}
        onSubmit={loginHandler}
      >
        {({ handleSubmit, dirty, isValid, isSubmitting }) => {
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
                name="password"
                label="Password"
                type="password"
                id="password"
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
                SignIn
              </Button>
              <Grid container>
                <Grid item xs>
                  <MatLink
                    component={Link}
                    to="/forget-password"
                    variant="body2"
                  >
                    Forget Password
                  </MatLink>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default memo(SignInScreen);
