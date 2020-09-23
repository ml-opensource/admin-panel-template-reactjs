import React, { memo } from "react";
import { Route, Redirect } from "react-router-dom";
import DefaultLayout from "layouts/DefaultLayout/DefaultLayout";

const RouteWrapper: React.ElementType = ({
  component,
  isPrivateRoute,
  isAuthRoute,
  layout,
  ...rest
}) => {
  const isPrivate = isPrivateRoute || false;
  const isAuth = isAuthRoute || false;
  const routeLayout = layout || DefaultLayout;

  const accessToken = false;

  const signed = !!accessToken;

  /**
   * Redirect user to SignIn page if he tries to access a private route
   * without authentication.
   */
  if (isPrivate && !signed) {
    return <Redirect to="/sign-in" />;
  }

  /**
   * Redirect user to Main page if he tries to access an auth route
   * (SignIn or SignUp) after being authenticated.
   */
  if (isAuth && signed) {
    return <Redirect to="/" />;
  }

  /**
   * If not included on both previous cases, redirect user to the desired route.
   */
  return (
    <Route
      {...rest}
      render={(props): React.ReactElement => {
        return React.createElement(
          routeLayout!,
          props as React.Attributes,
          React.createElement(component!, props)
        );
      }}
    />
  );
};

export default memo(RouteWrapper);
