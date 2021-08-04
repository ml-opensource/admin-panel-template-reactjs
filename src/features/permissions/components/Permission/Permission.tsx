import { memo, ReactNode } from "react";

import { Redirect } from "react-router-dom";

import { PermissionEnum } from "../../constants/permissions.scopes";
import usePermissions from "../../hooks/permissions.hooks";

interface PermissionProps {
  /**
   * Wrapped elements to be outputted given the required
   * permissions are met
   */
  children: ReactNode;
  /**
   * Element to display in case of required permissions
   * haven't been met
   */
  fallback?: ReactNode;
  /**
   * Toggles whether a user must have all of the required
   * permissions, or default is at least one of them
   */
  hasAll?: boolean;
  /**
   * Where to direct the user, if required permissions
   * aren't met. If no path is supplied, the user will
   * not be redirected.
   */
  redirectTo?: string;
  /**
   * An array of required permissions
   */
  requiredPermissions: PermissionEnum[];
}

/**
 * The permission component allows you to only display
 * content to users that have the required permissions.
 * It can be used in two ways. First one is wrapping the
 * content that is restricted, and using it as a HOC. The
 * second way, is to use the hasPermission function, to then
 * enable or disable buttons, for example.
 */
const Permission = ({
  children,
  fallback,
  hasAll,
  redirectTo,
  requiredPermissions,
}: PermissionProps) => {
  const { hasPermissions } = usePermissions();
  const allowed = hasPermissions(requiredPermissions, hasAll);

  /**
   * In case there is more than one child element, we need
   * to wrap the whole thing in a fragment.
   */
  if (allowed) return <>{children}</>;
  if (redirectTo) return <Redirect to={redirectTo} />;
  if (fallback) return <>{fallback}</>;
  return null;
};

export default memo(Permission);
