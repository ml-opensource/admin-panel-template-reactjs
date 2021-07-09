import { DownOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { MenuProps } from "antd/lib/menu";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { hasPermissions } from "@app/features/permissions/permissions";
import { PRIVATE_LIST } from "@app/routes/routes.config";
import { RouteGroupDef, RouteItemDef } from "@app/types/route.types";

import NavLink from "../NavLink/NavLink";
import styles from "./NavMenu.module.scss";

const checkPermissions = (item: RouteItemDef | RouteGroupDef) =>
  "permissions" in item ? hasPermissions(item.permissions) : true;

const navLinks: RouteItemDef[] = PRIVATE_LIST.filter(
  route => !route.hideInNavigation && checkPermissions(route)
);

interface NavMenuProps {
  isSidebar?: boolean;
  mode?: MenuProps["mode"];
}

const NavMenu = ({ isSidebar, mode }: NavMenuProps) => {
  const { t } = useTranslation();
  const location = useLocation();

  const rootPathname = isSidebar
    ? [...location.pathname.split(/(?=\/)/g, 1)]
    : undefined;

  const highlightMenu = [
    ...location.pathname.split(/(?=\/)/g, 1), // Highlight root url
    location.pathname.substr(0, location.pathname.lastIndexOf("/")), // Highlight parent url
    location.pathname, // Highlight entire url
  ];

  /**
   * Ant Design has a bug, where it is NOT possible
   * to create custom wrapper components around the Menu's sub components.
   * So all AntD Menu components need to be in the same render for now
   */
  return (
    <Menu
      mode={mode}
      selectedKeys={highlightMenu}
      defaultOpenKeys={rootPathname}
      theme="dark"
    >
      {navLinks.map(navItem =>
        navItem.nestedRoutes?.length ? (
          <Menu.SubMenu
            key={Array.isArray(navItem.path) ? navItem.path[0] : navItem.path}
            popupOffset={[-16, 7]}
            title={
              <div className={styles.subMenuItem}>
                <span>
                  {navItem.navigationTitle
                    ? t(navItem.navigationTitle)
                    : `Missing navigationTitle for "${navItem.id}"`}
                </span>
                {!isSidebar && <DownOutlined className={styles.icon} />}
              </div>
            }
          >
            {navItem.nestedRoutes
              ?.filter(checkPermissions)
              .map((subItem: RouteItemDef | RouteGroupDef) =>
                "groupTitle" in subItem ? (
                  <Menu.ItemGroup
                    key={subItem.id}
                    title={t(subItem.groupTitle)}
                  >
                    {subItem.nestedRoutes
                      ?.filter(checkPermissions)
                      .map(subGroupItem => (
                        <Menu.Item
                          key={
                            Array.isArray(subGroupItem.path)
                              ? subGroupItem.path[0]
                              : subGroupItem.path
                          }
                        >
                          <NavLink navItem={subGroupItem} />
                        </Menu.Item>
                      ))}
                  </Menu.ItemGroup>
                ) : (
                  <Menu.Item
                    key={
                      Array.isArray(subItem.path)
                        ? subItem.path[0]
                        : subItem.path
                    }
                  >
                    <NavLink navItem={subItem} />
                  </Menu.Item>
                )
              )}
          </Menu.SubMenu>
        ) : (
          <Menu.Item
            key={Array.isArray(navItem.path) ? navItem.path[0] : navItem.path}
          >
            <NavLink navItem={navItem} />
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

export default NavMenu;
