import React, { FC, memo } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link as RouterLink } from "react-router-dom";
import { RouteItemDef, RouterLocation } from "types/routeDef";
import DashboardIcon from "@material-ui/icons/Dashboard";
import objstr from "obj-str";

import { useStyles } from "./NavListItem.styles";

interface NavListItemProps {
  item: RouteItemDef;
  location: RouterLocation;
  nested: boolean;
  sideNavToggle?: () => void;
}

const NavListItem: FC<NavListItemProps> = ({
  item,
  location,
  nested,
  sideNavToggle,
}) => {
  const classes = useStyles();

  // Using Dashboard Icon as a fallback icon
  const NavIcon = (item.icon || DashboardIcon) as React.ElementType;

  return (
    <ListItem
      key={item.navigationTitle}
      className={objstr({ [classes.nested]: nested })}
      onClick={sideNavToggle}
      button
      component={RouterLink}
      to={item.path}
      selected={item.path === location.pathname}
    >
      <ListItemIcon>
        <NavIcon />
      </ListItemIcon>
      <ListItemText primary={item.navigationTitle} />
    </ListItem>
  );
};

export default memo(NavListItem);
