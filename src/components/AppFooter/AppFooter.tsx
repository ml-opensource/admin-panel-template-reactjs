import React, { FC, memo } from "react";

import styles from "./AppFooter.module.scss";

const AppFooter: FC = () => {
  return <div className={styles.appFooter}>ML ReactJS Template.</div>;
};

export default memo(AppFooter);
