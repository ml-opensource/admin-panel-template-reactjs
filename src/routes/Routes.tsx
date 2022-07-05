import { ElementType, memo, useMemo, useRef } from "react";

import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import BlankLayout from "@app/components/layouts/BlankLayout/BlankLayout";
import HeaderLayout from "@app/components/layouts/HeaderLayout/HeaderLayout";
import SidebarLayout from "@app/components/layouts/SidebarLayout/SidebarLayout";
import { Permission } from "@app/features/permissions/permissions";
import { flatten } from "@app/helpers/route.helper";
import { useAppSelector } from "@app/redux/store";
import {
  RouteComponentDef,
  RouteItemDef,
  RouteWrapperConfigDef,
} from "@app/types/route.types";

import LoginRedirect from "./components/LoginRedirect/LoginRedirect";
import NotFound from "./components/NotFound/NotFound";
import RestrictAccess from "./components/RestrictAccess/RestrictAccess";
import { LayoutsEnum } from "./constants/route.layouts";
import { PRIVATE_LIST, PUBLIC_LIST } from "./routes.config";

/**
 * All Layouts
 */
const LAYOUTS = {
  [LayoutsEnum.HEADER_LAYOUT]: HeaderLayout,
  [LayoutsEnum.SIDEBAR_LAYOUT]: SidebarLayout,
  [LayoutsEnum.BLANK_LAYOUT]: BlankLayout,
};

/**
 * Change the default layout to:
 * - HeaderLayout
 * - SidebarLayout
 */
const DefaultLayoutEnum = LayoutsEnum.HEADER_LAYOUT;

const Routes = () => {
  const { isAuthenticated } = useAppSelector(state => ({
    isAuthenticated: state.auth?.isAuthenticated,
  }));

  const location = useLocation();
  const layoutRef = useRef<ElementType>(LAYOUTS[DefaultLayoutEnum]);

  const matchedRoute: RouteItemDef | undefined = useMemo(
    () =>
      flatten([...PUBLIC_LIST, ...PRIVATE_LIST]).filter(
        route => route.path === location.pathname
      )[0],
    [location.pathname]
  );

  layoutRef.current = isAuthenticated
    ? LAYOUTS[matchedRoute?.layout ?? DefaultLayoutEnum]
    : LAYOUTS[LayoutsEnum.BLANK_LAYOUT];

  const routeWrapper = (
    { id, path, component, permissions }: RouteItemDef,
    { isProtectedRoute }: RouteWrapperConfigDef | undefined = {}
  ) => {
    return (
      <Route
        key={id}
        path={path}
        render={routeProps => {
          if (isProtectedRoute && !isAuthenticated) {
            return <LoginRedirect />;
          }
          const Component = component as RouteComponentDef;
          const renderContent = <Component {...routeProps} />;

          return (
            (permissions && (
              <Permission
                fallback={<RestrictAccess />}
                requiredPermissions={permissions}
              >
                {renderContent}
              </Permission>
            )) ||
            renderContent
          );
        }}
      />
    );
  };

  const Layout = layoutRef.current;

  return (
    <Layout>
      <Switch>
        <Redirect exact from="/" to="/home" />

        {PRIVATE_LIST.map(route =>
          routeWrapper(route, { isProtectedRoute: true })
        )}
        {PUBLIC_LIST.map(route => routeWrapper(route))}
        <Route path="*" render={() => <NotFound />} />
      </Switch>
    </Layout>
  );
};

export default memo(Routes);
