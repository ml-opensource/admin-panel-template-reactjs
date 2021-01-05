import React, { ElementType, memo, Suspense } from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import DefaultLayout from "@app/components/layouts/DefaultLayout/DefaultLayout";
import { Permission } from "@app/features/permissions/permissions";
import { RouteItemDef } from "@app/types/route.types";

import { PRIVATE_LIST, ROOT_ROUTE } from "./routes.config";

const Routes = () => {
  const routeWrapper = (route: RouteItemDef) => {
    const Layout = (route.layout ?? DefaultLayout) as ElementType;
    return (
      <Route
        key={route.id}
        exact
        path={route.path}
        render={(props): React.ReactElement => {
          const Component = route.component;
          const Content = () => (
            <Layout>
              <Component {...props} />
            </Layout>
          );

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
