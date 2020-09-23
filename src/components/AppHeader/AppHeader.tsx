import React, { FC, memo } from "react";
import logo from "assets/images/logo.svg";
import Navbar from "components/Navbar/Navbar";
import { useStyles } from "./AppHeader.styles";

const AppHeader: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <img src={logo} alt="App logo" className={classes.logo} />
      <Navbar />
    </div>
  );
};

export default memo(AppHeader);
