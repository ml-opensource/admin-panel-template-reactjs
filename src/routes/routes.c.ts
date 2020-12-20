import { AUTH_ROUTES } from "features/auth/auth";
import { HOME_ROUTES } from "features/home/home";
import { USER_ROUTES } from "features/users/users";

export const ROOT_ROUTE = "/";
export const AUTH_ROUTE = "/sign-in";

export const ROUTE_LIST = [...AUTH_ROUTES, ...HOME_ROUTES, ...USER_ROUTES];
