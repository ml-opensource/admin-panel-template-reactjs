import { AxiosResponse } from "axios";
import apiHelper from "api/apiHelper";
import apiEndpoints from "api/apiEndpoints";

const list = (): Promise<AxiosResponse> => {
  return apiHelper.get(apiEndpoints.user);
};

const detail = (id: string): Promise<AxiosResponse> => {
  return apiHelper.get(`${apiEndpoints.user}/${id}`);
};

const userApis = {
  list,
  detail,
};

export default userApis;
