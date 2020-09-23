import React, { FC, memo, Suspense } from "react";
import { Switch } from "react-router-dom";
import Route from "./RouteWrapper";
import { ROUTE_LIST } from "./Routes.config";

const Routes: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        {ROUTE_LIST.map(route => (
          <Route key={route.path} {...route} />
        ))}
      </Switch>
    </Suspense>
  );
};

export default memo(Routes);
