import React, { FC, memo } from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { useTheme } from "@material-ui/core/styles";
import NavContent from "./components/NavContent/NavContent";
import { useStyles } from "./SideNav.styles";

interface SideNavProps {
  sideNavOpen: boolean;
  sideNavToggle: () => void;
}
const SideNav: FC<SideNavProps> = ({ sideNavOpen, sideNavToggle }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <Hidden mdUp implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={sideNavOpen}
          onClose={sideNavToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <NavContent />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <NavContent />
        </Drawer>
      </Hidden>
    </div>
  );
};

export default memo(SideNav);
