import { RouteItemDef } from "types/route";
import { PermissionEnum } from "features/permissions/permissions";
import HomeScreen from "./screens/HomeScreen/HomeScreen";

const homeScreen: RouteItemDef = {
  path: "/",
  component: HomeScreen,
  permissions: [PermissionEnum.DASHBOARD],
};

const homeRoutes: RouteItemDef[] = [homeScreen];

export default homeRoutes;
