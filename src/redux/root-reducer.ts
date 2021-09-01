import { combineReducers } from "@reduxjs/toolkit";

import { authReducer, AUTH_FEATURE_KEY } from "@app/features/auth/auth";
import {
  permissionsReducer,
  PERMISSIONS_FEATURE_KEY,
} from "@app/features/permissions/permissions";
import {
  usersReducer,
  USERS_FEATURE_KEY,
} from "@app/features/settings/settings";

const rootReducer = combineReducers({
  [USERS_FEATURE_KEY]: usersReducer,
  [PERMISSIONS_FEATURE_KEY]: permissionsReducer,
  [AUTH_FEATURE_KEY]: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
