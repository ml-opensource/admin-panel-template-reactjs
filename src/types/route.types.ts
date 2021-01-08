import { ComponentType, ReactNode } from "react";

import { RouteComponentProps } from "react-router-dom";

import { PermissionEnum } from "@app/features/permissions/permissions";

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
  /**
   * Screen (or component) to show
   * when navigating to the menu item
   */
  component: ComponentType<RouteComponentProps<any>>;
  /** Layout used for this route */
  layout?: ReactNode;
  /** The required permissions to view this route (optional) */
  permissions?: PermissionEnum[];
};
