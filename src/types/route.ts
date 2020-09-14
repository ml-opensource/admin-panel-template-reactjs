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
  /** The required permissions to view this route */
  permissions?: string[];
};
