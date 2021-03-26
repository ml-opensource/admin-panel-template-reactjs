import React, { memo } from "react";

import { MenuMode } from "antd/lib/menu";
import cx from "classnames";

import { ReactComponent as Logo } from "@app/assets/images/logo.svg";

import NavMenu from "../NavMenu/NavMenu";
import styles from "./NavLeftContent.module.scss";

interface NavLeftContentProps {
  mode?: MenuMode;
}

const NavLeftContent = memo(({ mode = "horizontal" }: NavLeftContentProps) => {
  const isSidebar = mode === "inline";

  return (
    <>
      <div
        className={cx(styles.logoContainer, {
          [styles.isSidebar]: isSidebar,
        })}
      >
        <Logo className={styles.logo} />
      </div>
      <NavMenu mode={mode} isSidebar={isSidebar} />
    </>
  );
});

export default NavLeftContent;
