import { PermissionEnum } from "@app/features/permissions/permissions";
import { RouteItemDef } from "@app/types/route.types";

import { SettingsPathsEnum } from "../constants/settings.paths";
import ProjectsScreen from "../screens/ProjectsScreen/ProjectsScreen";
import UsersScreen from "../screens/UsersScreen/UsersScreen";
import SettingsRoutes from "./SettingsRoutes";

const SETTINGS_SCREEN: RouteItemDef = {
  id: "settings",
  path: SettingsPathsEnum.SETTINGS,
  navigationTitle: "settings.navigationTitle",
  component: SettingsRoutes,
  nestedRoutes: [
    /**
     * A single screen
     */
    {
      id: "projects",
      path: SettingsPathsEnum.PROJECTS,
      navigationTitle: "settingsProjects.navigationTitle",
      component: ProjectsScreen,
    },
    /**
     * A group of screens
     * - group title
     * - nested routes
     */
    {
      id: "admin-settings",
      groupTitle: "settings.groupUsersSettings",
      nestedRoutes: [
        {
          id: "users",
          path: SettingsPathsEnum.USERS,
          navigationTitle: "settingsUsers.navigationTitle",
          component: UsersScreen,
          permissions: [PermissionEnum.USERS_READ],
        },
      ],
    },
  ],
};

export const SETTINGS_ROUTES = [SETTINGS_SCREEN];
