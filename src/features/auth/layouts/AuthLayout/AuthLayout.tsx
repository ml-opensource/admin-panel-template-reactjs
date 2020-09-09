import React, { FC, memo } from "react";
import AppFooter from "components/AppFooter/AppFooter";
import styles from "./AuthLayout.module.scss";

const AuthLayout: FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
      <AppFooter />
    </div>
  );
};

export default memo(AuthLayout);
