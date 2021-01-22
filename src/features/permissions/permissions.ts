import { PermissionEnum } from "./constants/permissions.scopes";

export { default as Permission } from "./components/Permission/Permission";
export { default as usePermissions } from "./hooks/permissions.hooks";
export { setPermissions, clearPermissions } from "./logics/permissions.logics";

export { PermissionEnum };
