import React, { FC, memo } from "react";
import AppHeader from "components/AppHeader/AppHeader";
import AppFooter from "components/AppFooter/AppFooter";
import styles from "./DefaultLayout.module.scss";

const DefaultLayout: FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <AppHeader />
      <div className={styles.content}>{children}</div>
      <AppFooter />
    </div>
  );
};

export default memo(DefaultLayout);
