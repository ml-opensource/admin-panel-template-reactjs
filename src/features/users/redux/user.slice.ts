import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { api } from "api/api";

import {
  GetUserResponse,
  UpdateUserInput,
  UpdateUserResponse,
  UserInfo,
} from "../types/user.types";

export type UserState = {
  info: UserInfo | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  info: null,
  loading: false,
  error: null,
};

export const getUser = createAsyncThunk<UserInfo>("users/getUser", async () => {
  const userId = 1; // For example
  const response = await api.get<GetUserResponse>(`/user/${userId}`);
  return response.data.data;
});

export const updateUser = createAsyncThunk<UpdateUserResponse, UpdateUserInput>(
  "users/updateUser",
  async updateUserInput => {
    const userId = 1; // For example
    const response = await api.put<UpdateUserResponse>(
      `/user/${userId}`,
      updateUserInput
    );
    return response.data;
  }
);

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
  },
  extraReducers: builder => {
    builder.addCase(getUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getUser.fulfilled,
      (state, action: PayloadAction<UserInfo>) => {
        state.loading = false;
        state.info = action.payload;
      }
    );
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(updateUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      if (state.info) {
        state.info = {
          ...state.info,
          ...action.payload,
        };
      }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});

export const { setCurrentUser, updateCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
