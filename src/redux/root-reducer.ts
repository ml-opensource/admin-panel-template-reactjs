import { combineReducers } from "@reduxjs/toolkit";

import {
  usersReducer,
  USERS_FEATURE_KEY,
} from "@app/features/settings/settings";

const rootReducer = combineReducers({
  [USERS_FEATURE_KEY]: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
