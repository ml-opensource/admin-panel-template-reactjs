import React, { FC, memo } from "react";

import { Route, Switch } from "react-router-dom";

import { ClientErrors } from "@app/constants/error.constants";
import DefaultLayout from "@app/layouts/DefaultLayout/DefaultLayout";
import ErrorScreen from "@app/screens/ErrorScreen/ErrorScreen";
import HomeScreen from "@app/screens/HomeScreen/HomeScreen";

const Router: FC = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <DefaultLayout>
            <HomeScreen />
          </DefaultLayout>
        )}
      />
      <Route
        path="*"
        render={() => (
          <DefaultLayout>
            <ErrorScreen status={ClientErrors.NOT_FOUND} />
          </DefaultLayout>
        )}
      />
    </Switch>
  );
};

export default memo(Router);
