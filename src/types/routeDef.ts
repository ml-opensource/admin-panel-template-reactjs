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
  component: React.ReactNode;
  /** Layout will be used for this route */
  layout?: React.ReactNode;
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
  /** Icon of menu item for sidebar using https://material.io/resources/icons */
  icon?: string;
  /** Submenu items (max level 1) */
  subMenuItems?: RouteItemDef[];
};

export type RouterLocation = {
  hash?: string;
  key?: string;
  pathname: string;
  search: string;
};
