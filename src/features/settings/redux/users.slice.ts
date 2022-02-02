import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { mapPagination } from "@app/helpers/table.helper";
import { TablePaginationDef } from "@app/types/pagination.types";

import * as userApi from "../api/users.api";
import {
  GetUserByIdResponseDef,
  GetUsersParamDef,
  GetUsersResponseDef,
  UserDef,
} from "../types/user.types";

export const USERS_FEATURE_KEY = "users";

interface SliceState {
  users: UserDef[];
  user: UserDef | null;
  pagination: TablePaginationDef;
  loading: boolean;
  error: string | undefined | null;
}

const initialState: SliceState = {
  users: [],
  user: null,
  pagination: {
    current: 1,
    pageSize: 20,
    total: 0,
  },
  loading: false,
  error: null,
};

export const getUsers = createAsyncThunk<GetUsersResponseDef, GetUsersParamDef>(
  "users/getUsers",
  async (params, { rejectWithValue }) => {
    try {
      const response = await userApi.getUsers(params);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserById = createAsyncThunk<
  GetUserByIdResponseDef,
  UserDef["id"]
>("users/getUserById", async (userId, { rejectWithValue }) => {
  try {
    const response = await userApi.getUserById(userId);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const usersSlice = createSlice({
  name: USERS_FEATURE_KEY,
  initialState,
  reducers: {
    clearUser: state => {
      state.user = null;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    /** GET USERS */
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
    /** GET USER */
    builder.addCase(getUserById.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getUserById.fulfilled,
      (state, action: PayloadAction<GetUserByIdResponseDef>) => {
        state.loading = false;
        state.user = action.payload.data;
      }
    );
    builder.addCase(getUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
