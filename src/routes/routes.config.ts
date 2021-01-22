import { HOME_ROUTES } from "@app/features/home/home";
import { SETTINGS_ROUTES } from "@app/features/settings/settings";

export const ROOT_ROUTE = "/";

export const PRIVATE_LIST = [...HOME_ROUTES, ...SETTINGS_ROUTES];
