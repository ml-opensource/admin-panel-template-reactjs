import { Switch, Route } from "react-router-dom";

import { flatten } from "@app/helpers/route.helper";

import { SETTINGS_ROUTES } from "./settings.routes";

const SettingsRoutes = () => {
  const routesWithComponents = flatten(SETTINGS_ROUTES);

  return (
    <Switch>
      {routesWithComponents.map(route => (
        <Route
          exact
          key={route.id}
          path={route.path}
          component={route.component}
        />
      ))}
    </Switch>
  );
};

export default SettingsRoutes;
