import React from "react";
import { RouteItemDef } from "types/routeDef";
import { PermissionEnum } from "features/permissions/permissions";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { HomePathsEnum } from "../constants/home.paths";

const HomeScreen = React.lazy(() => import("../screens/HomeScreen/HomeScreen"));

const HOME_SCREEN: RouteItemDef = {
  path: HomePathsEnum.HOME,
  component: HomeScreen,
  icon: DashboardIcon,
  navigationTitle: "Dashboard",
  pageTitle: "Dashboard Page",
  permissions: [PermissionEnum.DASHBOARD],
};

export const HOME_ROUTES = [HOME_SCREEN];
