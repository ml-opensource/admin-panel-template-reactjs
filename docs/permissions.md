# Permissions

In many admin panels, there will be different user roles, so instead of wrapping components, actions and screens in specific user roles, we are using permission scopes to guard different parts of the application.

## Example of setting permissions

When the user is fetched from the API, the user object should contain a list of its permissions, which we will set via the permission component:

```jsx
import { setPermissions } from "components/Permissions/Permissions";
const response = await axios.get("/me");
const user = response.data;
setPermissions(user.permissions ?? []);
```

And now the Permission component, will have access to the permission scopes.

## Example of guarding feature

Let's say we have screen where only administrators should be able to create new users. To solve this, we can wrap the button in the Permission component and pass in the specific permission scope that is required, so if the current user doesn't meet the requirement then nothing will be shown.

```jsx
<Permission
  requiredPermissions={[PermissionEnum.USERS_WRITE]}
  // fallback={<NoAccess />}
  // redirect="/forbidden"
>
  <Button onClick={createUser}>{t("users.buttonCreateUser")}</Button>
</Permission>
```

As an alternative, we can use the function `hasPermission`, but you will have to manually handle redirect and fallback.

```jsx
{
  hasPermission([PermissionEnum.USERS_WRITE]) && (
    <Button onClick={createUser}>{t("users.buttonCreateUser")}</Button>
  );
}
```
