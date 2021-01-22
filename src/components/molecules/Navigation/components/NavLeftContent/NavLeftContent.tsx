import { memo } from "react";

import { Menu } from "antd";
import { useLocation } from "react-router-dom";

import { ReactComponent as Logo } from "@app/assets/images/logo.svg";
import { PRIVATE_LIST } from "@app/routes/routes.config";
import { RouteItemDef } from "@app/types/route.types";

import NavLink from "../NavLink/NavLink";
import NavSubMenu from "../NavSubMenu/NavSubMenu";
import styles from "./NavLeftContent.module.scss";

const navLinks: RouteItemDef[] = PRIVATE_LIST.filter(
  route => !route.hideInNavigation
);

const NavLeftContent = memo(() => {
  const location = useLocation();

  return (
    <>
      <div className={styles.logoContainer}>
        <Logo className={styles.logo} />
      </div>
      <Menu mode="horizontal" selectedKeys={[location.pathname]} theme="dark">
        {navLinks.map(navItem =>
          navItem.nestedRoutes?.length ? (
            <NavSubMenu key={navItem.path} item={navItem} />
          ) : (
            <Menu.Item key={navItem.path}>
              <NavLink navItem={navItem} />
            </Menu.Item>
          )
        )}
      </Menu>
    </>
  );
});

export default NavLeftContent;
