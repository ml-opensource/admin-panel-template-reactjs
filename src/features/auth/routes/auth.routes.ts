import React from "react";
import { RouteItemDef } from "types/routeDef";
import { AuthPathsEnum } from "../constants/auth.paths";

const AuthLayout = React.lazy(() => import("../layouts/AuthLayout/AuthLayout"));
const SignInScreen = React.lazy(() =>
  import("../screens/SignInScreen/SignInScreen")
);

const SIGN_IN_SCREEN: RouteItemDef = {
  path: AuthPathsEnum.SIGN_IN,
  component: SignInScreen,
  layout: AuthLayout,
  isAuthRoute: true,
};

const AUTH_ROUTES = [SIGN_IN_SCREEN];

export default AUTH_ROUTES;
