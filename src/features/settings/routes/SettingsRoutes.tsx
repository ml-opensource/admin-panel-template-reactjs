import { flatten } from "@app/helpers/route.helper";
import NestedRouteWrapper from "@app/routes/NestedRouteWrapper";

import { SETTINGS_ROUTES } from "./settings.routes";

const SettingsRoutes = () => {
  const routesWithComponents = flatten(SETTINGS_ROUTES);

  return <NestedRouteWrapper routesWithComponents={routesWithComponents} />;
};

export default SettingsRoutes;
