import React, { FC, memo } from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import logo from "assets/images/logo.svg";
import Typography from "@material-ui/core/Typography";
import { useLocation } from "react-router-dom";
import { ROUTE_LIST } from "routes/Routes.config";
import { RouteItemDef, RouterLocation } from "types/routeDef";
import NavListItem from "../NavListItem/NavListItem";
import NestedListItem from "../NestedListItem/NestedListItem";
import { useStyles } from "./NavContent.styles";

interface NavContentProps {
  sideNavToggle?: () => void;
}
const NavContent: FC<NavContentProps> = ({ sideNavToggle }) => {
  const classes = useStyles();

  const navLinks: RouteItemDef[] = ROUTE_LIST.filter(
    route => !route.isAuthRoute
  );

  const location: RouterLocation = useLocation();

  return (
    <div>
      <div className={classes.toolbar}>
        <img src={logo} className={classes.logo} alt="App logo" />
        <Typography variant="h6">Admin Panel</Typography>
      </div>
      <Divider />
      <List>
        {navLinks.map(navItem => (
          <React.Fragment key={navItem.navigationTitle}>
            {navItem.subMenuItems ? (
              <NestedListItem
                item={navItem}
                location={location}
                sideNavToggle={sideNavToggle}
              />
            ) : (
              <NavListItem
                item={navItem}
                location={location}
                sideNavToggle={sideNavToggle}
              />
            )}
          </React.Fragment>
        ))}
      </List>
      <Divider />
    </div>
  );
};

export default memo(NavContent);
