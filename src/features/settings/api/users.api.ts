import { api } from "@app/api/api";

import { GetUsersParamDef } from "../types/user.types";

export const getUsers = (params?: GetUsersParamDef) => {
  return api.get("/users", { params });
};
