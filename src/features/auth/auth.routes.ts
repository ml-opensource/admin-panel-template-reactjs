import { RouteItemDef } from "types/route";
import SignInScreen from "features/auth/screens/SignIn/SignIn";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";

const signInScreen: RouteItemDef = {
  path: "/sign-in",
  component: SignInScreen,
  layout: AuthLayout,
  isAuthRoute: true,
};

const authRoutes: RouteItemDef[] = [signInScreen];

export default authRoutes;
