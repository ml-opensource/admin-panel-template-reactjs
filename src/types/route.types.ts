import { ComponentType, ReactNode } from "react";

import { RouteComponentProps } from "react-router-dom";

import { PermissionEnum } from "@app/features/permissions/permissions";

export type RouteGroupDef = {
  id: string;
  groupTitle: string;
  /** Nested Routes */
  nestedRoutes?: RouteItemDef[];
};

export type RouteComponentDef = ComponentType<RouteComponentProps<any>>;

export type RouteItemDef = {
  /**
   * Unique id for the path
   * The id should be the same for paths that are showing the same component
   */
  id: string;
  /**
   * The URL path for when
   * the component should be rendered
   */
  path: string;
  /** Navigation title of menu item for navbar */
  navigationTitle?: string;
  /**
   * Screen (or component) to show
   * when navigating to the menu item
   */
  component: RouteComponentDef;
  /** Layout used for this route */
  layout?: ReactNode;
  /** Nested Routes either by array of routes or group of routes */
  nestedRoutes?: Array<RouteItemDef | RouteGroupDef>;
  /** Flag for hide/show in navigation bar */
  hideInNavigation?: boolean;
  /** The required permissions to view this route (optional) */
  permissions?: PermissionEnum[];
};
