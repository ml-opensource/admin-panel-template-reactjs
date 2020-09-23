import React, { FC, memo } from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { useStyles } from "./Navbar.styles";

const Navbar: FC = () => {
  const classes = useStyles();
  const accessToken = false;

  const handleSignOut = (): void => {
    // do something
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Home
        </Typography>
        <div>
          {accessToken ? (
            <Button color="inherit" onClick={handleSignOut}>
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
