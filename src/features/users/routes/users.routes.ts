import React from "react";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { RouteItemDef } from "types/routes.types";

import { UserPathsEnum } from "../constants/users.paths";

const ProfileScreen = React.lazy(
  () => import("../screens/ProfileScreen/ProfileScreen")
);

const PROFILE_SCREEN: RouteItemDef = {
  id: "users",
  path: UserPathsEnum.PROFILE,
  component: ProfileScreen,
  isPrivateRoute: true,
  navigationTitle: "Profile",
  icon: AccountCircleIcon,
  pageTitle: "My Profile",
};

const USER_ROUTES = [PROFILE_SCREEN];

export default USER_ROUTES;
