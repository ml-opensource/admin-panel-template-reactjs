import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { LoginRequestDef } from "@app/features/auth/auth";

import { authGetMe, authLogin } from "../api/auth.api";
import { saveTokens, clearTokens } from "../helpers/auth.helpers";
import { UserDef } from "../types/auth.types";

export const AUTH_FEATURE_KEY = "auth";

interface InitialStateDef {
  user: UserDef | null;
  isAuthenticated: boolean;
  error: boolean;
  loading: boolean;
}

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
      /*
       * expected options from real api
       * const { IdToken, RefreshToken, ExpiresIn, ...user } = action.payload;
       *
       *  limited response from demo api:
       */
      const { token } = action.payload;

      state.loading = false;
      // state.user = null; // user; not implemented
      state.isAuthenticated = true;

      /* expected condition when real api: if (IdToken && RefreshToken && ExpiresIn) { */
      if (token) {
        saveTokens({ token });
      }
    });
    builder.addCase(login.rejected, state => {
      state.error = true;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      clearTokens();
    });
    /**
     * GET AUTHENTICATED USER
     */

    builder.addCase(getMe.pending, state => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      const { data } = action.payload;
      const user: UserDef = {
        email: data.email,
        name: `${data.first_name} ${data.last_name}`,
        avatar: data.avatar,
      };
      state.loading = false;
      state.user = user;
      state.isAuthenticated = true;
    });
    builder.addCase(getMe.rejected, state => {
      state.error = true;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      clearTokens();
    });
  },
});

export const { clearUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
