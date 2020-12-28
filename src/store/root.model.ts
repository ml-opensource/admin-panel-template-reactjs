import { Models } from "@rematch/core";

// eslint-disable-next-line import/no-cycle
import { UserModel } from "features/users/users";

export interface RootModel extends Models<RootModel> {
  user: typeof UserModel;
}

export const models: RootModel = {
  user: UserModel,
};
