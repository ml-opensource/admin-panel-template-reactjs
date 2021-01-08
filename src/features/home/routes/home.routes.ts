import { lazy } from "react";

import { RouteItemDef } from "@app/types/route.types";

import { HomePathsEnum } from "../constants/home.paths";

const HomeScreen = lazy(() => import("../screens/HomeScreen/HomeScreen"));

const HOME_SCREEN: RouteItemDef = {
  id: "home",
  path: HomePathsEnum.HOME,
  component: HomeScreen,
};

export const HOME_ROUTES = [HOME_SCREEN];
