import { memo } from "react";

import { LogoutOutlined } from "@ant-design/icons";
import { Menu, Avatar } from "antd";
import { useTranslation } from "react-i18next";

import { clearUser } from "@app/features/auth/auth";
import { getInitials } from "@app/helpers/util.helper";
import { useAppDispatch, useAppSelector } from "@app/redux/store";

const NavRightContent = memo(() => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  // Using the current user
  const { user } = useAppSelector(state => ({
    user: state.auth.user,
  }));
  const name = user?.name ?? "John Doe";
  const userInitials = getInitials(name, 3);

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <Menu mode="horizontal" theme="dark">
      <Menu.SubMenu
        key="user"
        popupOffset={[-16, 7]}
        title={<Avatar size={40}>{userInitials}</Avatar>}
      >
        <Menu.Item
          key="logout"
          danger
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          {t("auth.logout")}
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
});

export default NavRightContent;
