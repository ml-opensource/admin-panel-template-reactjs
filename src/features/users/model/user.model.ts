import { createModel } from "@rematch/core";

import { api } from "api/api";
import { RootModel } from "store/root.model";

import { UpdateUserInput, UserInfo } from "../types/user.types";

export type UserModelState = {
  user: UserInfo | null;
  error: Error | null;
};

export const UserModel = createModel<RootModel>()({
  state: {
    user: null,
    error: null,
  } as UserModelState,
  reducers: {
    updateCurrentUser: (state, user: UserInfo) => ({
      ...state,
      user: {
        ...state.user,
        ...user,
      },
    }),
    setCurrentUser: (state, user: UserInfo) => ({
      ...state,
      user,
    }),
    setAuthError: (state, error: Error) => ({
      ...state,
      error,
    }),
  },
  effects: dispatch => ({
    async updateUserInfo(payload: UpdateUserInput) {
      try {
        const result = await api.put("/user/1", payload);
        dispatch.user.setCurrentUser(result.data);
      } catch (error) {
        dispatch.user.setAuthError(error);
      }
    },
  }),
});
