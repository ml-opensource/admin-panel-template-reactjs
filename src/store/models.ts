import auth from "features/auth/model.auth";
import user from "features/users/model.user";

export interface RootModel {
  auth: typeof auth;
  user: typeof user;
}

export const models: RootModel = { auth, user };
