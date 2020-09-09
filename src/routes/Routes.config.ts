import authRoutes from "features/auth/routes.auth";
import userRoutes from "features/users/routes.user";
import homeRoutes from "features/home/routes.home";
import { RouteItemDef } from "types/route";

const routeList: RouteItemDef[] = [...authRoutes, ...userRoutes, ...homeRoutes];

export default routeList;
