import ProfileScreen from "features/users/screens/Profile/Profile";
import { RouteItemDef } from "types/route";

const profileScreen: RouteItemDef = {
  path: "/profile",
  component: ProfileScreen,
  isPrivateRoute: true,
};

const userRoutes: RouteItemDef[] = [profileScreen];

export default userRoutes;
