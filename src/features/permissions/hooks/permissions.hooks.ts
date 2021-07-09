import { useEffect, useState } from "react";

import { PermissionEnum } from "../constants/permissions.scopes";
import { hasPermissions } from "../logics/permissions.logics";

function usePermissions(
  requiredPermissions: PermissionEnum[],
  hasAll?: boolean
) {
  const [allowed, setAllowed] = useState<boolean>(false);

  useEffect(() => {
    if (!requiredPermissions) {
      // eslint-disable-next-line no-console
      console.warn("No required permissions passed in. Was this on purpose?");
    }

    const hasPermission = hasPermissions(requiredPermissions, hasAll);
    setAllowed(hasPermission);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requiredPermissions, hasAll]);

  return allowed;
}

export default usePermissions;
