import { AxiosResponse } from "axios";
import { api } from "api/apiHelper";

import { LoginDataDef } from "../types/auth.loginDataDef";
import { AuthEndpointsEnum } from "../constants/auth.endpoints";

const signIn = (data: LoginDataDef): Promise<AxiosResponse> => {
  return api.post(AuthEndpointsEnum.LOGIN, data);
};

export const authApi = {
  signIn,
};
