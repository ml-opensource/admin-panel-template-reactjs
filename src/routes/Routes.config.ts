import authRoutes from "features/auth/auth.routes";
import userRoutes from "features/users/user.routes";
import homeRoutes from "features/home/home.routes";
import { RouteItemDef } from "types/route";

export const ROOT_ROUTE = "/";
export const AUTH_ROUTE = "/sign-in";

const routeList: RouteItemDef[] = [...authRoutes, ...userRoutes, ...homeRoutes];

export default routeList;
