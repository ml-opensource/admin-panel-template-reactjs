import React from "react";
import { RouteItemDef } from "types/routeDef";
import { HomePathsEnum } from "../constants/home.paths";

const HomeScreen = React.lazy(() => import("../screens/HomeScreen/HomeScreen"));

const HOME_SCREEN: RouteItemDef = {
  path: HomePathsEnum.HOME,
  component: HomeScreen,
};

export const HOME_ROUTES = [HOME_SCREEN];
