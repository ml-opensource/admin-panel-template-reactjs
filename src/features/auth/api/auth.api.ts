import { AxiosResponse } from "axios";
import { api } from "api/apiHelper";

import {
  LoginDataDef,
  ForgetPasswordDataDef,
} from "../types/auth.loginDataDef";
import { AuthEndpointsEnum } from "../constants/auth.endpoints";

const signIn = (data: LoginDataDef): Promise<AxiosResponse> => {
  return api.post(AuthEndpointsEnum.LOGIN, data);
};

const forgetPassword = (
  data: ForgetPasswordDataDef
): Promise<AxiosResponse> => {
  return api.post(AuthEndpointsEnum.FORGET_PASSWORD, data);
};

export const authApi = {
  signIn,
  forgetPassword,
};
