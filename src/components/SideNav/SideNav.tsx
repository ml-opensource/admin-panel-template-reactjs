import React, { FC, memo } from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { useTheme, ThemeProvider } from "@material-ui/core/styles";
import NavContent from "./components/NavContent/NavContent";
import { useStyles, darkTheme } from "./SideNav.styles";

interface SideNavProps {
  sideNavOpen: boolean;
  sideNavToggle: () => void;
}
const SideNav: FC<SideNavProps> = ({ sideNavOpen, sideNavToggle }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={darkTheme}>
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
            <NavContent sideNavToggle={sideNavToggle} />
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
      </ThemeProvider>
    </div>
  );
};

export default memo(SideNav);
