import { AxiosResponse } from "axios";

import { api } from "@app/api/api";

import {
  GetUsersResponseDef,
  GetUsersParamDef,
  GetUserByIdResponseDef,
} from "../types/user.types";

export const getUsers = (
  params?: GetUsersParamDef
): Promise<AxiosResponse<GetUsersResponseDef>> => {
  return api.get("/users", { params });
};

export const getUserById = (
  userId: number
): Promise<AxiosResponse<GetUserByIdResponseDef>> => {
  return api.get(`/users/${userId}`);
};
