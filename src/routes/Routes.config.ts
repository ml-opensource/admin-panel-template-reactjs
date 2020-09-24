import { AUTH_ROUTES } from "features/auth/auth";
import { USER_ROUTES } from "features/users/users";
import { HOME_ROUTES } from "features/home/home";

export const ROUTE_LIST = [...AUTH_ROUTES, ...HOME_ROUTES, ...USER_ROUTES];
