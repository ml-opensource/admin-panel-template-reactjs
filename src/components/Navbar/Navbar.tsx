import React, { FC, memo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { iRootState, Dispatch } from "store/store";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import styles from "./Navbar.module.scss";

const Navbar: FC = () => {
  const auth = useSelector((state: iRootState) => state.auth);
  const dispatch = useDispatch<Dispatch>();

  const signOut = (): void => {
    dispatch.auth.signOut();
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" className={styles.title}>
          Home
        </Typography>
        <div>
          {auth.accessToken ? (
            <Button color="inherit" onClick={signOut}>
              Sign out
            </Button>
          ) : (
            <Link color="inherit" component={RouterLink} to="/sign-in">
              Sign In
            </Link>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Navbar);
