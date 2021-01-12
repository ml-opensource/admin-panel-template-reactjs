import React, { FC, memo, Suspense } from "react";

import { Route, Switch } from "react-router-dom";

import Loader from "components/Loader/Loader";
import {
  Permission,
  PermissionEnum,
  setPermissions,
} from "features/permissions/permissions";
import DefaultLayout from "layouts/DefaultLayout/DefaultLayout";
import { RouteItemDef } from "types/routes.types";

import { ROUTE_LIST } from "./routes.config";

const Routes: FC = () => {
  // Set user's permission scope
  setPermissions([PermissionEnum.DASHBOARD]);

  const routeWrapper = ({
    component: Component,
    layout,
    permissions,
    path,
    id,
  }: RouteItemDef) => {
    const RouteLayout: FC = layout || DefaultLayout;

    return (
      <Route
        exact
        key={id}
        path={path}
        render={(props): React.ReactElement => {
          const Content = (): JSX.Element => (
            <RouteLayout>
              <Component {...props} />
            </RouteLayout>
          );

          return (
            (permissions && (
              <Permission
                fallback={<div>Restricted</div>}
                requiredPermissions={permissions}
              >
                <Content />
              </Permission>
            )) || <Content />
          );
        }}
      />
    );
  };

  return (
    <Suspense fallback={<Loader isFullScreen />}>
      <Switch>{ROUTE_LIST.map(route => routeWrapper(route))}</Switch>
    </Suspense>
  );
};

export default memo(Routes);
