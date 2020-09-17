import React, { FC, memo } from "react";
import { Switch } from "react-router-dom";
import {
  setPermissions,
  PermissionEnum,
} from "features/permissions/permissions";
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
    </Switch>
  );
};

export default memo(Routes);
