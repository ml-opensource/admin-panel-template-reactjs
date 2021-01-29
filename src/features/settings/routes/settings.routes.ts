import { RouteItemDef } from "@app/types/route.types";

import { SettingsPathsEnum } from "../constants/settings.paths";
import UsersScreen from "../screens/UsersScreen/UsersScreen";
import VehiclesScreen from "../screens/VehiclesScreen/VehiclesScreen";
import SettingsRoutes from "./SettingsRoutes";

const SETTINGS_SCREEN: RouteItemDef = {
  id: "settings",
  path: SettingsPathsEnum.SETTINGS,
  navigationTitle: "settings.navigationTitle",
  component: SettingsRoutes,
  nestedRoutes: [
    {
      id: "entity-management",
      groupTitle: "settings.groupEntityManagement",
      nestedRoutes: [
        {
          id: "vehicles",
          path: SettingsPathsEnum.VEHICLES,
          navigationTitle: "settingsVehicles.navigationTitle",
          component: VehiclesScreen,
        },
      ],
    },
    {
      id: "admin-settings",
      groupTitle: "settings.groupAdminSettings",
      nestedRoutes: [
        {
          id: "users",
          path: [
            SettingsPathsEnum.USERS,
            SettingsPathsEnum.USERS_CREATE,
            SettingsPathsEnum.USERS_EDIT,
          ],
          navigationTitle: "settingsUsers.navigationTitle",
          component: UsersScreen,
        },
      ],
    },
  ],
};

export const SETTINGS_ROUTES = [SETTINGS_SCREEN];
