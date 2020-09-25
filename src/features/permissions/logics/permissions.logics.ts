import { PERMISSIONS_KEY } from "../constants/permissions.keys";
import { PermissionEnum } from "../constants/permissions.scopes";

export const getPermissions = () => {
  // TODO: move to redux
  const permissions = sessionStorage.getItem(PERMISSIONS_KEY);

  return (
    (permissions &&
      (permissions.split(",") as PermissionEnum | PermissionEnum[])) ||
    undefined
  );
};

export const setPermissions = (permissions: PermissionEnum[]) => {
  // TODO: move to redux
  sessionStorage.setItem(PERMISSIONS_KEY, permissions.toString());
};

export const clearPermissions = () => {
  // TODO: move to redux
  sessionStorage.removeItem(PERMISSIONS_KEY);
};
