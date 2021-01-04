import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { api } from "api/api";
// eslint-disable-next-line import/no-cycle
import { AppThunk } from "redux/store";

import {
  UpdateUserInput,
  UpdateUserResponse,
  UserInfo,
} from "../types/user.types";

export type UserState = {
  info: UserInfo | null;
  error: Error | null;
};

const initialState: UserState = {
  error: null,
  info: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateCurrentUser(state, action: PayloadAction<Partial<UserInfo>>) {
      if (state.info) {
        state.info = {
          ...state.info,
          ...action.payload,
        };
      }
    },
    setCurrentUser(state, action: PayloadAction<UserInfo>) {
      state.info = action.payload;
    },
    setError(state, action: PayloadAction<Error>) {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentUser,
  updateCurrentUser,
  setError,
} = userSlice.actions;

export const fetchUser = (): AppThunk => async dispatch =>
  api.get<{ data: UserInfo }>("/user/1").then(
    response => dispatch(setCurrentUser(response.data.data)),
    error => dispatch(setError(error))
  );

export const updateUser = (
  payload: UpdateUserInput
): AppThunk => async dispatch =>
  api.put<UpdateUserResponse>("/user/1", payload).then(
    response => dispatch(updateCurrentUser(response.data)),
    error => dispatch(setError(error))
  );

export default userSlice.reducer;
