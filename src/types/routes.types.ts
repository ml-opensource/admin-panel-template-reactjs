import { FC, ComponentType } from "react";

import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon";
import { RouteComponentProps } from "react-router-dom";

import { PermissionEnum } from "features/permissions/permissions";

export type RouteItemDef = {
  /**
   * The URL path for when
   * the component should be rendered
   */
  path: string;
  /**
   * Screen (or component) to show
   * when navigating to the menu item
   */
  component: ComponentType<RouteComponentProps>;
  /** Layout used for this route */
  layout?: FC;
  /** Determine authenticated route */
  isPrivateRoute?: boolean;
  /**
   * Determine authentication route.
   * Ex: Login, Register, Forgot password...
   * This route can not be access after logging in
   */
  isAuthRoute?: boolean;
  /** Navigation title of menu item for navbar or sidebar */
  navigationTitle?: string;
  /** Page title of the screen to be shown on the header */
  pageTitle?: string;
  /** Icon of menu item for sidebar using https://material.io/resources/icons
   * We are only allowed to use Material UI SVG icons
   */
  icon?: OverridableComponent<SvgIconTypeMap>;
  /** Sub menu items (max level 1) */
  subMenuItems?: RouteItemDef[];
  /** The required permissions to view this route (optional) */
  permissions?: PermissionEnum[];
};

export type RouterLocation = {
  hash?: string;
  key?: string;
  pathname: string;
  search: string;
};
