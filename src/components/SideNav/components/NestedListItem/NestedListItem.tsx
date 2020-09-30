import React, { FC, memo, useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { RouteItemDef, RouterLocation } from "types/routeDef";
import NavListItem from "../NavListItem/NavListItem";

interface NestedListItem {
  item: RouteItemDef;
  location: RouterLocation;
  sideNavToggle?: () => void;
}

const NestedListItem: FC<NestedListItem> = ({
  item,
  location,
  sideNavToggle,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemIcon>
          <Icon>{item.icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={item.navigationTitle} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.subMenuItems?.map(subMenu => (
            <NavListItem
              key={item.navigationTitle}
              item={subMenu}
              location={location}
              nested
              sideNavToggle={sideNavToggle}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default memo(NestedListItem);
