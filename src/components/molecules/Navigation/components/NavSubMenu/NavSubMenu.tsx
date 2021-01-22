import { DownOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useTranslation } from "react-i18next";

import { RouteGroupDef, RouteItemDef } from "@app/types/route.types";

import NavLink from "../NavLink/NavLink";
import styles from "./NavSubMenu.module.scss";

interface NavSubMenuProps {
  item: RouteItemDef;
  isSidebar?: boolean;
}

const NavSubMenu = ({ item, isSidebar, ...props }: NavSubMenuProps) => {
  const { t } = useTranslation();

  return (
    <Menu.SubMenu
      popupOffset={[-16, 7]}
      key={item.path}
      title={
        <div className={styles.subMenuItem}>
          <span>
            {item.navigationTitle
              ? t(item.navigationTitle)
              : `Missing navigationTitle for "${item.id}"`}
          </span>
          {!isSidebar && <DownOutlined className={styles.icon} />}
        </div>
      }
      {...props}
    >
      {item.nestedRoutes?.map((subItem: RouteItemDef | RouteGroupDef) =>
        "groupTitle" in subItem ? (
          <Menu.ItemGroup key={subItem.id} title={t(subItem.groupTitle)}>
            {subItem.nestedRoutes?.map(subGroupItem => (
              <Menu.Item key={subGroupItem.path}>
                <NavLink navItem={subGroupItem} />
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
        ) : (
          <Menu.Item key={subItem.path}>
            <NavLink navItem={subItem} />
          </Menu.Item>
        )
      )}
    </Menu.SubMenu>
  );
};

export default NavSubMenu;
