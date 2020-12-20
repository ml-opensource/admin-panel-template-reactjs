import { AxiosResponse } from "axios";

import { api } from "api/api";

import { AuthEndpointsEnum } from "../constants/auth.endpoints";
import { LoginDataDef } from "../types/auth.types";

const signIn = (data: LoginDataDef): Promise<AxiosResponse> => {
  return api.post(AuthEndpointsEnum.LOGIN, data);
};

export const authApi = {
  signIn,
};
