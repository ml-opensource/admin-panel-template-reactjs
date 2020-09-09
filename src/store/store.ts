import { init, RematchRootState, RematchDispatch } from "@rematch/core";
import createRematchPersist from "@rematch/persist";
import { models, RootModel } from "./models";

const persistPlugin = createRematchPersist({
  whitelist: ["auth"],
});

export const store = init({
  models,
  plugins: [persistPlugin],
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type iRootState = RematchRootState<RootModel>;
