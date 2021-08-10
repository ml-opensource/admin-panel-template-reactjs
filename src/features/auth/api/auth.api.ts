import { AxiosResponse } from "axios";

import { api } from "@app/api/api";

import { LoginRequestDef } from "../types/auth.types";

export const authLogin = (data: LoginRequestDef): Promise<AxiosResponse> => {
  return api.post("/login", data);
};

export const authGetMe = (): Promise<AxiosResponse> => {
  return api.get("users/2");
};
