import React, { FC, memo } from "react";

import logo from "assets/images/logo.svg";
import Navbar from "components/Navbar/Navbar";

import styles from "./AppHeader.module.scss";

const AppHeader: FC = () => {
  return (
    <div className={styles.header}>
      <img src={logo} alt="App logo" className={styles.logo} />
      <Navbar />
    </div>
  );
};

export default memo(AppHeader);
