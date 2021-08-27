import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { LoginRequestDef, AUTH_FEATURE_KEY } from "@app/features/auth/auth";

import { authGetMe, authLogin } from "../api/auth.api";
import {
  saveTokens,
  clearTokens,
  authErrorHelper,
} from "../helpers/auth.helpers";
import { UserDef, InitialStateDef, UserResponseDef } from "../types/auth.types";

const initialState: InitialStateDef = {
  user: null,
  isAuthenticated: false,
  error: false,
  loading: false,
};

export const login = createAsyncThunk(
  `${AUTH_FEATURE_KEY}/login`,
  async (values: LoginRequestDef, { rejectWithValue }) => {
    try {
      const response = await authLogin(values);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getMe = createAsyncThunk(
  `${AUTH_FEATURE_KEY}/getUser`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await authGetMe();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: AUTH_FEATURE_KEY,
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      clearTokens();
    },
  },
  extraReducers: builder => {
    /**
     * LOGIN
     */
    builder.addCase(login.pending, state => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const { token } = action.payload;
      state.loading = false;
      state.isAuthenticated = true;

      if (token) {
        saveTokens({ token });
      }
    });
    builder.addCase(login.rejected, state => {
      authErrorHelper(state);
      clearTokens();
    });
    /**
     * GET AUTHENTICATED USER
     */

    builder.addCase(getMe.pending, state => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(
      getMe.fulfilled,
      (state, action: PayloadAction<UserResponseDef>) => {
        const { data } = action.payload;
        const name = `${data.first_name} ${data.last_name}`;

        const user: UserDef = {
          ...data,
          name: name ?? "John Doe", // <= fallback name, TODO: remove
        };
        state.loading = false;
        state.user = user;
        state.isAuthenticated = true;
      }
    );
    builder.addCase(getMe.rejected, state => {
      authErrorHelper(state);
      clearTokens();
    });
  },
});

export const { clearUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
