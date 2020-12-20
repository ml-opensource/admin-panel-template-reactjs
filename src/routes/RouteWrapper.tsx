import React, { FC, memo } from "react";

import { Route, Redirect } from "react-router-dom";

import { Permission } from "features/permissions/permissions";
import DefaultLayout from "layouts/DefaultLayout/DefaultLayout";
import { RouteItemDef } from "types/routes.types";

import { AUTH_ROUTE, ROOT_ROUTE } from "./routes.c";

const RouteWrapper: FC<RouteItemDef> = ({
  component: Component,
  isPrivateRoute,
  isAuthRoute,
  layout,
  permissions,
  ...rest
}) => {
  const isPrivate = isPrivateRoute || false;
  const isAuth = isAuthRoute || false;
  const RouteLayout: FC = layout || DefaultLayout;

  const accessToken = false;

  const signed = !!accessToken;

  /**
   * Redirect user to SignIn page if he tries to access a private route
   * without authentication.
   */
  if (isPrivate && !signed) {
    return <Redirect to={AUTH_ROUTE} />;
  }

  /**
   * Redirect user to Main page if trying to access an auth route
   * (SignIn or SignUp) after being authenticated.
   */
  if (isAuth && signed) {
    return <Redirect to={ROOT_ROUTE} />;
  }

  /**
   * If not included on both previous cases, redirect user to the desired route.
   */
  return (
    <Route
      {...rest}
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

export default memo(RouteWrapper);
