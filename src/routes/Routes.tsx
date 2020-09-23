import React, { FC, memo, Suspense } from "react";
import { Switch } from "react-router-dom";
import Loader from "components/Loader/Loader";
import Route from "./RouteWrapper";
import { ROUTE_LIST } from "./Routes.config";

const Routes: FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {ROUTE_LIST.map(route => (
          <Route key={route.path} {...route} />
        ))}
      </Switch>
    </Suspense>
  );
};

export default memo(Routes);
