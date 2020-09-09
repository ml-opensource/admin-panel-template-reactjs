import React, { FC, memo } from "react";
import { Switch } from "react-router-dom";
import HomeScreen from "features/home/screens/HomeScreen/HomeScreen";
import Route from "./RouteWrapper";
import routeList from "./Routes.config";

const Routes: FC = () => {
  return (
    <Switch>
      {routeList.map(route => (
        <Route key={route.path} {...route} />
      ))}

      {/* redirect user to Home page if route does not exist and user is not authenticated */}
      <Route component={HomeScreen} />
    </Switch>
  );
};

export default memo(Routes);
