import React, { FC, memo, Suspense } from "react";

import { Switch } from "react-router-dom";

import Loader from "components/Loader/Loader";
import {
  PermissionEnum,
  setPermissions,
} from "features/permissions/permissions";

import RouteWrapper from "./RouteWrapper";
import { ROUTE_LIST } from "./routes.c";

const Routes: FC = () => {
  // Set user's permission scope
  setPermissions([PermissionEnum.DASHBOARD]);

  return (
    <Suspense fallback={<Loader isFullScreen />}>
      <Switch>
        {ROUTE_LIST.map(route => (
          <RouteWrapper key={route.path} {...route} />
        ))}
      </Switch>
    </Suspense>
  );
};

export default memo(Routes);
