import React, { FC, memo } from "react";
import { Switch } from "react-router-dom";
import HomeScreen from "features/home/screens/HomeScreen/HomeScreen";
import { setPermissions } from "components/Permission/Permission";
import { PermissionEnum } from "constants/permissionScopes";
import RouteWrapper from "./RouteWrapper";
import routeList from "./Routes.config";

const Routes: FC = () => {
  // Set user's permission scope
  setPermissions([PermissionEnum.DASHBOARD]);

  return (
    <Switch>
      {routeList.map(route => (
        <RouteWrapper key={route.path} {...route} />
      ))}

      {/* redirect user to Home page if route does not exist and user is not authenticated */}
      <RouteWrapper component={HomeScreen} />
    </Switch>
  );
};

export default memo(Routes);
