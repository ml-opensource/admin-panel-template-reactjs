import React, { FC, memo, useState } from "react";
import Navbar from "components/Navbar/Navbar";
import AppFooter from "components/AppFooter/AppFooter";
import SideNav from "components/SideNav/SideNav";
import { useStyles } from "./DefaultLayout.styles";

const DefaultLayout: FC = ({ children }) => {
  const classes = useStyles();
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const onToggleSideNav = (): void => {
    setSideNavOpen(!sideNavOpen);
  };
  return (
    <div className={classes.root}>
      <SideNav sideNavOpen={sideNavOpen} sideNavToggle={onToggleSideNav} />
      <div className={classes.content}>
        <Navbar sideNavToggle={onToggleSideNav} />
        <div className={classes.container}>{children}</div>
        <AppFooter />
      </div>
    </div>
  );
};

export default memo(DefaultLayout);
