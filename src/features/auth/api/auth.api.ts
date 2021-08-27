import { AxiosResponse } from "axios";

import { api } from "@app/api/api";

import { AuthEndpointsEnum } from "../constants/auth.endpoints";
import { LoginRequestDef } from "../types/auth.types";

export const authLogin = (data: LoginRequestDef): Promise<AxiosResponse> => {
  return api.post(AuthEndpointsEnum.LOGIN, data);
};

export const authGetMe = (): Promise<AxiosResponse> => {
  // Using a fixed user to emulate a get current user call
  return api.get(`${AuthEndpointsEnum.USERS}/2`);
};
