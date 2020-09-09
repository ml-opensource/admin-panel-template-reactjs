import { RouteItemDef } from "types/route";
import HomeScreen from "./screens/HomeScreen/HomeScreen";

const homeScreen: RouteItemDef = {
  path: "/",
  component: HomeScreen,
};

const homeRoutes: RouteItemDef[] = [homeScreen];

export default homeRoutes;
