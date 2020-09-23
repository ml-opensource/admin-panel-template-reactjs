import { AxiosResponse } from "axios";
import { api } from "api/apiHelper";
import { UsersEndpointsEnum } from "../constants/users.endpoints";

const list = (): Promise<AxiosResponse> => {
  return api.get(UsersEndpointsEnum.USERS);
};

const detail = (id: string): Promise<AxiosResponse> => {
  return api.get(`${UsersEndpointsEnum.USERS}/${id}`);
};

export const userApi = {
  list,
  detail,
};
