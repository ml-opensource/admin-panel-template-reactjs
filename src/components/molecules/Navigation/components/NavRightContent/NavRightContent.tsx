import { memo } from "react";

import { Menu, Avatar } from "antd";

import { getInitials } from "@app/helpers/util.helper";

const NavRightContent = memo(() => {
  // TODO: use current user
  const userInitials = getInitials("John Doe", 3);

  return (
    <Menu mode="horizontal" theme="dark">
      <Menu.Item key="user">
        <Avatar size={40}>{userInitials}</Avatar>
      </Menu.Item>
    </Menu>
  );
});

export default NavRightContent;
