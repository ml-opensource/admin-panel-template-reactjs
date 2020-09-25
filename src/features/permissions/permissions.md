# Permissions

In many admin panels, there will be different user roles, such as admins, and different types of restricted users. Instead of wrapping components, actions, and screens in specific user roles, we are using permission scopes to guard different parts of the application. This allows the backend to modify existing user roles to limit or get access to parts without having to make any changes in the frontend.

## Set user's permissions

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

## Guarding a feature

### Component

Let's say we have screen where only administrators should be able to create new users. To solve this, we can wrap the button in the Permission component and pass in the specific permission scope that is required to create new users, so if the current user doesn't meet the requirement then the button will not be shown.

```jsx
import { Permission, PermissionEnum } from "features/permissions/permissions";

const MyApp = () => {
  return (
    <Permission requiredPermissions={[PermissionEnum.USERS_CREATE]}>
      <Button onClick={createUser}>{t("users.buttonCreateUser")}</Button>
    </Permission>
  );
};
```

### Hook

As an alternative, we can use the hook `usePermissions`, so we can disable the button, if that is the case:

```jsx
import {
  usePermissions,
  PermissionEnum,
} from "features/permissions/permissions";

const MyApp = () => {
  const { allowed } = usePermissions([PermissionEnum.USERS_CREATE]);

  return (
    <Button onClick={createUser} disabled={allowed}>
      {t("users.buttonCreateUser")}
    </Button>
  );
};
```

## Guarding a screen

Each screen can have an optional permissions prop, which holds a list of different permissions required to view that screen.

```jsx
import { PermissionEnum } from "features/permissions/permissions";

const homeScreen: RouteItemDef = {
  path: "/",
  component: HomeScreen,
  permissions: [PermissionEnum.DASHBOARD],
};
```

### Fallback component

If the user doesn't have any of the required permissions, then a fallback component can be shown, for example that the screen has restricted access:

```jsx
import { Permission } from "features/permissions/permissions";

<Permission
  requiredPermissions={homeScreen.permissions}
  fallback={<div>Restricted Access</div>}
>
  <HomeScreen />
</Permission>;
```

### Redirect

We can also redirect the user to a different route when lacking the required permissions, for example to a "restricted access" screen:

```jsx
import { Permission } from "features/permissions/permissions";

<Permission
  requiredPermissions={homeScreen.permissions}
  redirectTo="/restricted-access"
>
  <HomeScreen />
</Permission>;
```
