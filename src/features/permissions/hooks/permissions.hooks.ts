import { useEffect, useState } from "react";

import { useAppSelector } from "@app/redux/store";

import { PermissionEnum } from "../constants/permissions.scopes";

function usePermissions(
  requiredPermissions: PermissionEnum[],
  hasAll?: boolean
) {
  const [allowed, setAllowed] = useState<boolean>(false);
  const { permissions } = useAppSelector(state => ({
    permissions: state.permissions.permissions,
  }));

  useEffect(() => {
    let hasPermission = false;

    if (!requiredPermissions) {
      // eslint-disable-next-line no-console
      console.warn("No required permissions passed in. Was this on purpose?");
    }

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
      setAllowed(hasPermission);
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        "No permissions detected. Did you remember to use setPermissions() to set the permissions?"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requiredPermissions, hasAll]);

  return { allowed };
}

export default usePermissions;
