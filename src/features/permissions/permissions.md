# Permissions

In many admin panels, there will be different user roles, such as admins, and different types of restricted users. Instead of wrapping components, actions, and screens in specific user roles, we are using permission scopes to guard different parts of the application. This allows the backend to modify existing user roles to limit or get access to parts without having to make any changes in the frontend.

## Example of setting permissions

When the user is fetched from the API, the user object should contain a list of permission scopes. These will be set with a function from the permission component:

```jsx
import { setPermissions } from "features/permissions/permissions";

// Get current user
const response = await axios.get("/me");
const user = response.data;

// Set user's permissions
setPermissions(user.permissions ?? []);
```

The Permission component will now have access to the user's permission scopes and can show/hide components.

## Example of guarding a feature

Let's say we have screen where only administrators should be able to create new users. To solve this, we can wrap the button in the Permission component and pass in the specific permission scope that is required to create new users, so if the current user doesn't meet the requirement then the button will not be shown.

```jsx
import { Permission, PermissionEnum } from "features/permissions/permissions";

<Permission requiredPermissions={[PermissionEnum.USERS_CREATE]}>
  <Button onClick={createUser}>{t("users.buttonCreateUser")}</Button>
</Permission>;
```

As an alternative, we can use the function `hasPermission`, so we can disable the button, if that is the case:

```jsx
import {
  hasPermission,
  PermissionEnum,
} from "features/permissions/permissions";

<Button
  onClick={createUser}
  disabled={!hasPermission([PermissionEnum.USERS_CREATE])}
>
  {t("users.buttonCreateUser")}
</Button>;
```

## Example of guarding a screen

Each screen can have an optional permissions prop, which holds a list of different permissions required to view that screen.

```jsx
import { PermissionEnum } from "features/permissions/permissions";

const homeScreen: RouteItemDef = {
  path: "/",
  component: HomeScreen,
  permissions: [PermissionEnum.DASHBOARD],
};
```

If the user has just one of the permissions, the path will be shown, otherwise a fallback will be shown, for example that the screen has restricted access. Alternatively, the user could be redirected to the root route, or to a "no access" screen.

```jsx
import { Permission } from "features/permissions/permissions";

<Permission
  requiredPermissions={homeScreen.permissions}
  fallback={<div>Restricted</div>}
  //redirect={ROOT_ROUTE}
>
  <homeScreen.component />
</Permission>;
```
