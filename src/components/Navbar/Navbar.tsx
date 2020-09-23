import React, { FC, memo } from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useStyles } from "./Navbar.styles";

interface NavbarProps {
  sideNavToggle: () => void;
}
const Navbar: FC<NavbarProps> = ({ sideNavToggle }) => {
  const classes = useStyles();
  const accessToken = false;

  const handleSignOut = (): void => {
    // do something
  };

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={sideNavToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
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
