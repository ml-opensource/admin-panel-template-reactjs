import { RequestStatusEnum } from "constants/requestStatus";
import { createModel } from "@rematch/core";
import { AuthStateDef } from "./types/authState";

const auth = createModel({
  state: {
    accessToken: null,
    signIn: {
      data: {},
      status: RequestStatusEnum.NOT_LOADED,
      error: undefined,
      message: null,
    },
  },

  reducers: {
    signInRequest: (state: AuthStateDef): AuthStateDef => {
      return {
        ...state,
        signIn: {
          data: {},
          status: RequestStatusEnum.LOADING,
          error: undefined,
          message: "",
        },
      };
    },
    signInSuccess: (
      state: AuthStateDef,
      payload: { token: string }
    ): AuthStateDef => {
      return {
        ...state,
        signIn: {
          data: payload,
          status: RequestStatusEnum.LOADED,
          error: undefined,
          message: "",
        },
        accessToken: payload.token,
      };
    },
    signInError: (
      state: AuthStateDef,
      payload: { error: string; message: string }
    ): AuthStateDef => {
      return {
        ...state,
        signIn: {
          data: {},
          status: RequestStatusEnum.ERROR,
          error: payload.error,
          message: payload.message,
        },
      };
    },
    signOut: (state: AuthStateDef): AuthStateDef => {
      return {
        ...state,
        accessToken: null,
      };
    },
  },
});

export default auth;
