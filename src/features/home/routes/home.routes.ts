import React from "react";

import DashboardIcon from "@material-ui/icons/Dashboard";

import { PermissionEnum } from "features/permissions/permissions";
import { RouteItemDef } from "types/routes.types";

import { HomePathsEnum } from "../constants/home.paths";

const HomeScreen = React.lazy(() => import("../screens/HomeScreen/HomeScreen"));

const HOME_SCREEN: RouteItemDef = {
  id: "home",
  path: HomePathsEnum.HOME,
  component: HomeScreen,
  icon: DashboardIcon,
  navigationTitle: "Dashboard",
  pageTitle: "Dashboard Page",
  permissions: [PermissionEnum.DASHBOARD],
};

export const HOME_ROUTES = [HOME_SCREEN];
