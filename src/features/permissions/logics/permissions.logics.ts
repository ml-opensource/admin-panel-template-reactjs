import { PERMISSIONS_KEY } from "../constants/permissions.keys";
import { PermissionEnum } from "../constants/permissions.scopes";

export const getPermissions = () => {
  const permissions = sessionStorage.getItem(PERMISSIONS_KEY);

  return (
    (permissions &&
      (permissions.split(",") as PermissionEnum | PermissionEnum[])) ||
    undefined
  );
};

export const setPermissions = (permissions: PermissionEnum[]) => {
  sessionStorage.setItem(PERMISSIONS_KEY, permissions.toString());
};

export const clearPermissions = () => {
  sessionStorage.removeItem(PERMISSIONS_KEY);
};
