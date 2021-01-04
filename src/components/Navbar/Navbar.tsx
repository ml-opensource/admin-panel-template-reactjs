import React, { FC, memo, useMemo } from "react";

import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useLocation } from "react-router-dom";

import { ROUTE_LIST } from "routes/routes.config";
import { RouterLocation } from "types/routes.types";

import { useStyles } from "./Navbar.styles";

interface NavbarProps {
  sideNavToggle: () => void;
}
const Navbar: FC<NavbarProps> = ({ sideNavToggle }) => {
  const classes = useStyles();
  const accessToken = true; // TODO: Need to Implement the Authorised user state
  const location: RouterLocation = useLocation();

  const pageTitle = useMemo(
    () => ROUTE_LIST.find(route => route.path === location.pathname)?.pageTitle,
    [location]
  );

  const handleSignOut = (): void => {
    // do something
  };

  return (
    <AppBar position="fixed" color="transparent" className={classes.root}>
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
          {pageTitle}
        </Typography>
        <div className={classes.sectionDesktop}>
          <Tooltip title="Notifications">
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="My Profile">
            <IconButton aria-label="account of current user" color="inherit">
              <AccountCircle />
            </IconButton>
          </Tooltip>
          {accessToken && (
            <Tooltip title="Sign Out">
              <IconButton
                aria-label="Sign Out"
                color="inherit"
                onClick={handleSignOut}
              >
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Navbar);
