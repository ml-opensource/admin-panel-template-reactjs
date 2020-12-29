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
    info: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@doe.com",
      avatar: "http://via.placeholder.com/50",
    },
    error: null,
  } as UserModelState,
  reducers: {
    updateCurrentUser: (state, user: Partial<UserInfo>) => ({
      ...state,
      user: {
        ...state.info,
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
    async getUserInfo() {
      try {
        const result = await api.get<UserInfo>("/user/1");
        dispatch.user.setCurrentUser(result.data);
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
