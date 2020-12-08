import { AUTH_ROUTES } from "features/auth/auth";
import { USER_ROUTES } from "features/users/users";
import { HOME_ROUTES } from "features/home/home";
import { EXAMPLE_ROUTES } from "features/example/example";

export const ROOT_ROUTE = "/";
export const AUTH_ROUTE = "/sign-in";

// Is there any reason why all routings are invalid when having HOME_ROUTES in top of all?
export const ROUTE_LIST = [
  ...AUTH_ROUTES,
  ...EXAMPLE_ROUTES,
  ...USER_ROUTES,
  ...HOME_ROUTES,
];
