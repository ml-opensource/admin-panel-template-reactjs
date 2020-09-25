import React from "react";
import { RouteItemDef } from "types/routeDef";
import { PermissionEnum } from "features/permissions/permissions";
import { HomePathsEnum } from "../constants/home.paths";

const HomeScreen = React.lazy(() => import("../screens/HomeScreen/HomeScreen"));

const HOME_SCREEN: RouteItemDef = {
  path: HomePathsEnum.HOME,
  component: HomeScreen,
  permissions: [PermissionEnum.DASHBOARD],
};

export const HOME_ROUTES = [HOME_SCREEN];
