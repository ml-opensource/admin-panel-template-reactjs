import store from "@app/redux/store";

import { PermissionEnum } from "../constants/permissions.scopes";

export const hasPermissions = (
  requiredPermissions?: PermissionEnum[],
  hasAll?: boolean
) => {
  // if no required permissions are passed in, then it's allowed
  if (!requiredPermissions?.length) return true;

  const { permissions } = store.getState().permissions;
  let hasPermission = false;

  if (permissions) {
    if (hasAll) {
      hasPermission = requiredPermissions.every(permission =>
        permissions.includes(permission)
      );
    } else {
      hasPermission = requiredPermissions.some(permission =>
        permissions.includes(permission)
      );
    }
    return hasPermission;
  }
  // eslint-disable-next-line no-console
  console.warn(
    "No user permissions detected. Did you remember to use setPermissions() to set the permissions?"
  );
  return hasPermission;
};
