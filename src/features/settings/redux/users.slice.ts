import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { mapPagination } from "@app/helpers/table.helper";
import { PaginationDef } from "@app/types/pagination.types";

import * as userApi from "../api/users.api";
import {
  GetUsersParamDef,
  GetUsersResponseDef,
  UserDef,
} from "../types/user.types";

export const USERS_FEATURE_KEY = "users";

interface SliceState {
  users: UserDef[];
  pagination: PaginationDef;
  loading: boolean;
  error: string | undefined | null;
}

const initialState: SliceState = {
  users: [],
  pagination: {
    current: 1,
    pageSize: 20,
    total: 0,
  },
  loading: false,
  error: null,
};

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (params: GetUsersParamDef, { rejectWithValue }) => {
    try {
      const response = await userApi.getUsers(params);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: USERS_FEATURE_KEY,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUsers.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getUsers.fulfilled,
      (state, action: PayloadAction<GetUsersResponseDef>) => {
        state.loading = false;
        state.users = action.payload.data;
        state.pagination = mapPagination(action.payload);
      }
    );
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const usersReducer = usersSlice.reducer;
