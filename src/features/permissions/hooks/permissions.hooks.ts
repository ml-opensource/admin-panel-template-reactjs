import { useEffect, useState } from "react";
import { PermissionEnum } from "../constants/permissions.scopes";
import { getPermissions } from "../logics/permissions.logics";

function usePermissions(
  requiredPermissions: PermissionEnum[],
  hasAll?: boolean
) {
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    const permissions = getPermissions();
    let allowed = false;

    if (!requiredPermissions) {
      // eslint-disable-next-line no-console
      console.warn("No required permissions passed in. Was this on purpose?");
    }

    if (permissions) {
      if (hasAll) {
        allowed = requiredPermissions.every(permission =>
          permissions.includes(permission)
        );
      } else {
        allowed = requiredPermissions.some(permission =>
          permissions.includes(permission)
        );
      }
      setHasPermission(allowed);
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        "No permissions detected. Did you remember to use setPermissions() to set the permissions?"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requiredPermissions, hasAll]);

  return { hasPermission };
}

export default usePermissions;
