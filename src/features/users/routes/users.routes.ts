import React from "react";
import { RouteItemDef } from "types/routeDef";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { UserPathsEnum } from "../constants/users.paths";

const ProfileScreen = React.lazy(
  () => import("../screens/ProfileScreen/ProfileScreen")
);

const PROFILE_SCREEN: RouteItemDef = {
  path: UserPathsEnum.PROFILE,
  component: ProfileScreen,
  isPrivateRoute: true,
  navigationTitle: "Profile",
  icon: AccountCircleIcon,
  pageTitle: "My Profile",
};

const USER_ROUTES = [PROFILE_SCREEN];

export default USER_ROUTES;
