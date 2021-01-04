import { combineReducers } from "@reduxjs/toolkit";

// eslint-disable-next-line import/no-cycle
import userReducer from "features/users/redux/user.slice";

const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
