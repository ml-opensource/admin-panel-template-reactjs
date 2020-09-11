const PERMISSIONS_KEY = "permissions";

const getPermissions = (): string | string[] | null => {
  const permissions = sessionStorage.getItem(PERMISSIONS_KEY);

  return permissions && permissions.split(",");
};

export const setPermissions = (permissions: string[]): void => {
  sessionStorage.setItem(PERMISSIONS_KEY, permissions.toString());
};

export const hasPermission = (
  requiredPermissions: string[],
  hasAll?: boolean
): boolean => {
  const permissions = getPermissions();
  let allowed = false;

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
  } else {
    // eslint-disable-next-line no-console
    console.warn(
      "No permissions detected. Did you remember to use setPermissions() to set the permissions?"
    );
  }

  return !!allowed;
};

export const clearPermissions = (): void => {
  sessionStorage.removeItem(PERMISSIONS_KEY);
};
