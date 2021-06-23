import { combineReducers } from "@reduxjs/toolkit";

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
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
