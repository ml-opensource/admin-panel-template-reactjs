import { AxiosResponse } from "axios";
import { LoginDataDef } from "features/auth/types/loginData";
import apiHelper from "api/apiHelper";
import apiEndpoints from "api/apiEndpoints";

const signIn = (data: LoginDataDef): Promise<AxiosResponse> => {
  return apiHelper.post(apiEndpoints.login, data);
};

const authApis = {
  signIn,
};

export default authApis;
