import { Switch, Route } from "react-router-dom";

import { Permission } from "@app/features/permissions/permissions";
import RestrictAccess from "@app/routes/components/RestrictAccess/RestrictAccess";
import { RouteComponentDef, RouteItemDef } from "@app/types/route.types";

import NotFound from "./components/NotFound/NotFound";

interface NestedRouteWrapperProps {
  routesWithComponents: RouteItemDef[];
}

const NestedRouteWrapper = ({
  routesWithComponents,
}: NestedRouteWrapperProps) => {
  return (
    <Switch>
      {routesWithComponents.map(route => (
        <Route
          exact
          key={route.id}
          path={route.path}
          render={routeProps => {
            const Component = route.component as RouteComponentDef;
            return (
              (route.permissions && (
                <Permission
                  fallback={<RestrictAccess />}
                  requiredPermissions={route.permissions}
                >
                  <Component {...routeProps} />
                </Permission>
              )) || <Component {...routeProps} />
            );
          }}
        />
      ))}
      <Route path="*" render={() => <NotFound />} />
    </Switch>
  );
};

export default NestedRouteWrapper;
