import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PermissionEnum } from "../permissions";

export const PERMISSIONS_FEATURE_KEY = "permissions";

interface SliceState {
  permissions: PermissionEnum[];
}

const initialState: SliceState = {
  permissions: [],
};

const permissionsSlice = createSlice({
  name: PERMISSIONS_FEATURE_KEY,
  initialState,
  reducers: {
    setPermissions: (state, action: PayloadAction<PermissionEnum[]>) => {
      state.permissions = action.payload ?? [];
    },
    clearPermissions: state => {
      state.permissions = [];
    },
  },
});

export const { setPermissions, clearPermissions } = permissionsSlice.actions;

export const permissionsReducer = permissionsSlice.reducer;
