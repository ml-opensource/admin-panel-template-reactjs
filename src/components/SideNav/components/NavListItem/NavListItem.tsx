import React, { FC, memo } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import { Link as RouterLink } from "react-router-dom";
import { RouteItemDef, RouterLocation } from "types/routeDef";
import { useStyles } from "./NavListItem.styles";

interface NavListItemProps {
  item: RouteItemDef;
  location: RouterLocation;
  nested?: boolean;
  sideNavToggle?: () => void;
}

const NavListItem: FC<NavListItemProps> = ({
  item,
  location,
  nested,
  sideNavToggle,
}) => {
  const classes = useStyles();

  return (
    <ListItem
      key={item.navigationTitle}
      className={nested ? classes.nested : ""}
      onClick={sideNavToggle}
      button
      component={RouterLink}
      to={item.path}
      selected={item.path === location.pathname}
    >
      <ListItemIcon>
        <Icon>{item.icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={item.navigationTitle} />
    </ListItem>
  );
};

export default memo(NavListItem);
