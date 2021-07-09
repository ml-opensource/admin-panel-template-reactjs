import { PermissionEnum } from "@app/features/permissions/permissions";
import { RouteItemDef } from "@app/types/route.types";

import { HomePathsEnum } from "../constants/home.paths";
import HomeScreen from "../screens/HomeScreen/HomeScreen";

const HOME_SCREEN: RouteItemDef = {
  id: "home",
  path: HomePathsEnum.HOME,
  navigationTitle: "home.navigationTitle",
  component: HomeScreen,
  permissions: [PermissionEnum.DASHBOARD],
};

export const HOME_ROUTES = [HOME_SCREEN];
