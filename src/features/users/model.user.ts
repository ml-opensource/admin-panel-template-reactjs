import { RequestStatusEnum } from "constants/requestStatus";
import { createModel } from "@rematch/core";
import { UserStateDef } from "./types/userState";

const user = createModel({
  state: {
    fetchUser: {
      data: {},
      status: RequestStatusEnum.NOT_LOADED,
      error: undefined,
      message: null,
    },
  },

  reducers: {
    fetchUserRequest: (state: UserStateDef): UserStateDef => {
      return {
        ...state,
        fetchUser: {
          data: {},
          status: RequestStatusEnum.LOADING,
          error: undefined,
          message: "",
        },
      };
    },
    fetchUserSuccess: (
      state: UserStateDef,
      payload: { data: object }
    ): UserStateDef => {
      return {
        ...state,
        fetchUser: {
          data: payload.data,
          status: RequestStatusEnum.LOADED,
          error: undefined,
          message: "",
        },
      };
    },
    fetchUserError: (
      state: UserStateDef,
      payload: { error: string; message: string }
    ): UserStateDef => {
      return {
        ...state,
        fetchUser: {
          data: {},
          status: RequestStatusEnum.ERROR,
          error: payload.error,
          message: payload.message,
        },
      };
    },
  },
});

export default user;
