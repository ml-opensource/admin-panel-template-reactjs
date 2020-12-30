import { createModel } from "@rematch/core";

import { api } from "api/api";
import { RootModel } from "store/root.model";

import {
  UpdateUserInput,
  UpdateUserResponse,
  UserInfo,
} from "../types/user.types";

export type UserModelState = {
  info: UserInfo | null;
  error: Error | null;
};

const UserModel = createModel<RootModel>()({
  state: {
    info: null,
    error: null,
  } as UserModelState,
  reducers: {
    updateCurrentUser: (state, user: Partial<UserInfo>) => ({
      ...state,
      info: {
        ...state.info,
        ...user,
      } as UserInfo,
    }),
    setCurrentUser: (state, user: UserInfo) => ({
      ...state,
      info: user,
    }),
    setAuthError: (state, error: Error) => ({
      ...state,
      error,
    }),
  },
  effects: dispatch => ({
    async getUserInfo() {
      try {
        const result = await api.get<{ data: UserInfo }>("/user/1");
        dispatch.user.setCurrentUser(result.data.data);
      } catch (error) {
        dispatch.user.setAuthError(error);
      }
    },
    async updateUserInfo(payload: UpdateUserInput) {
      try {
        const result = await api.put<UpdateUserResponse>("/user/1", payload);
        dispatch.user.updateCurrentUser(result.data);
      } catch (error) {
        dispatch.user.setAuthError(error);
      }
    },
  }),
});

export default UserModel;
