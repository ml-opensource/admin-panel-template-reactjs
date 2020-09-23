import React, { FC, memo } from "react";
import AppFooter from "components/AppFooter/AppFooter";
import { useStyles } from "./AuthLayout.styles";

const AuthLayout: FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.content}>{children}</div>
      <AppFooter />
    </div>
  );
};

export default memo(AuthLayout);
