import React, { FC, memo, Suspense } from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import { Permission } from "@app/features/permissions/permissions";
import { RouteItemDef } from "@app/types/route.types";

import { PRIVATE_LIST, ROOT_ROUTE } from "./routes.config";

const Routes: FC = () => {
  const routeWrapper = (route: RouteItemDef) => {
    return (
      <Route
        key={route.id}
        exact
        path={route.path}
        render={(props): React.ReactElement => {
          const Component = route.component;
          const Content = () => <Component {...props} />;

          return (
            (route.permissions && (
              <Permission
                fallback={<Redirect to={ROOT_ROUTE} />}
                requiredPermissions={route.permissions}
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
    <Suspense fallback={<>Loading...</>}>
      <Switch>{PRIVATE_LIST.map(route => routeWrapper(route))}</Switch>
    </Suspense>
  );
};

export default memo(Routes);
