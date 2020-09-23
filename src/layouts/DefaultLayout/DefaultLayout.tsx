import React, { FC, memo } from "react";
import AppHeader from "components/AppHeader/AppHeader";
import AppFooter from "components/AppFooter/AppFooter";
import { useStyles } from "./DefaultLayout.styles";

const DefaultLayout: FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <AppHeader />
      <div className={classes.content}>{children}</div>
      <AppFooter />
    </div>
  );
};

export default memo(DefaultLayout);
