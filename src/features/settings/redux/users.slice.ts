import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from "@reduxjs/toolkit";

import { mapPagination } from "@app/helpers/table.helper";
import { createApiAsyncThunk } from "@app/redux/api.thunk";
import { ErrorState, LoadingState } from "@app/types/api.types";
import { TablePaginationDef } from "@app/types/pagination.types";

import * as userApi from "../api/users.api";
import {
  GetUserByIdResponseDef,
  GetUsersParamDef,
  GetUsersResponseDef,
  UserDef,
} from "../types/user.types";

export const USERS_FEATURE_KEY = "users";

interface SliceState extends LoadingState, ErrorState {
  users: UserDef[];
  user: UserDef | null;
  pagination: TablePaginationDef;
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

export const getUsers = createApiAsyncThunk<
  GetUsersResponseDef,
  GetUsersParamDef
>("users/getUsers", userApi.getUsers);

export const getUserById = createApiAsyncThunk<
  GetUserByIdResponseDef,
  UserDef["id"]
>("users/getUserById", userApi.getUserById);

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
    builder.addCase(
      getUsers.fulfilled,
      (state, action: PayloadAction<GetUsersResponseDef>) => {
        state.users = action.payload.data;
        state.pagination = mapPagination(action.payload);
      }
    );
    builder.addCase(getUsers.rejected, (state, action) => {
      state.error = action.error.message;
    });
    /** GET USER */
    builder.addCase(
      getUserById.fulfilled,
      (state, action: PayloadAction<GetUserByIdResponseDef>) => {
        state.user = action.payload.data;
      }
    );
    builder.addMatcher(isPending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addMatcher(isFulfilled, state => {
      state.loading = false;
    });
    builder.addMatcher(isRejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
