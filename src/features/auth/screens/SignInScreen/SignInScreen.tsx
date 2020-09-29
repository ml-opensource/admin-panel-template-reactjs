import React, { FC, memo, useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import logo from "assets/images/logo.svg";
import { useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import { useStyles } from "./SignInScreen.styles";
import { authApi } from "../../api/auth.api";
import { setAuthentication, isAuthenticated } from "../../logic/auth.logic";

const SignInScreen: FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberLogin, setRememberLogin] = useState<boolean>(false);
  const [FPDialog, setFPDialog] = useState<boolean>(false);
  const [errorBar, setErrorBar] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const authenticated = isAuthenticated();

  useEffect(() => {
    if (authenticated) history.push("/");
  }, [authenticated, history]);

  const signIn = async (): Promise<void | AxiosResponse> => {
    // TODO: import and start loader after basic layout feature is merged
    try {
      const res = await authApi.signIn({
        email,
        password,
        rememberLogin,
      });

      if (res.status === 200) {
        if (res.data) {
          const { data } = res;
          setAuthentication(data);
          history.push("/");
          // TODO: stop loader
        }
      }
    } catch (error) {
      // TODO: Handle errors
      setErrorBar(true);
      setErrorMessage("Something went wrong with your login.");
    }
  };

  const resetPassword = async (
    forgetPassEmail: string
  ): Promise<void | AxiosResponse> => {
    try {
      const res = await authApi.forgetPassword({
        email: forgetPassEmail,
      });
      if (res.status === 200) {
        // reset the field and close the dialog
        setEmail("");
        setFPDialog(false);
        // TODO: Implement redirect to the required page
      }
    } catch (error) {
      // TODO: Handle errors
      setErrorBar(true);
      setErrorMessage("Something went wrong with resetting your password.");
    }
  };

  return (
    // TODO: Handle container positioning after merging the basic layout feature
    // TODO: Handle Form Validation
    <Container maxWidth="sm">
      {!authenticated && (
        <Paper elevation={3} className={classes.paper}>
          <img src={logo} alt="App logo" className={classes.logo} />

          <Box mb={3}>
            <Typography
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Project Name Admin Panel
            </Typography>

            <Typography variant="h6" align="center" color="textPrimary">
              Sign in to your account to continue
            </Typography>
          </Box>

          <Box mb={3}>
            <TextField
              id="email-address"
              label="Email Address"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Box>

          <Box mb={2}>
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Box>

          <Box mb={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberLogin}
                  onChange={() => setRememberLogin(!rememberLogin)}
                  name="rememberMe"
                  color="primary"
                />
              }
              label="Remember Me"
            />
          </Box>

          <Box mb={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={signIn}
            >
              Login to your account
            </Button>
          </Box>

          <Button fullWidth color="primary" onClick={() => setFPDialog(true)}>
            Forgot your password?
          </Button>
        </Paper>
      )}

      <ForgotPassword
        open={FPDialog}
        handleClose={() => setFPDialog(false)}
        resetPassword={resetPassword}
      />

      <Snackbar
        open={errorBar}
        onClose={() => setErrorBar(false)}
        message={errorMessage}
        autoHideDuration={4000}
      />
    </Container>
  );
};

export default memo(SignInScreen);
