import { LayoutsEnum } from "@app/routes/constants/route.layouts";
import { RouteItemDef } from "@app/types/route.types";

import { AuthPathsEnum } from "../constants/auth.paths";
import LoginScreen from "../screens/LoginScreen/LoginScreen";

const LOGIN_SCREEN: RouteItemDef = {
  id: "login",
  path: AuthPathsEnum.LOGIN,
  component: LoginScreen,
  navigationTitle: "auth.loginTitle",
  layout: LayoutsEnum.BLANK_LAYOUT,
};

export const AUTH_ROUTES = [LOGIN_SCREEN];
