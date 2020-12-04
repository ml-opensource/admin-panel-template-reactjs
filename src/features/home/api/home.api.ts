import { AxiosResponse } from "axios";
import { api } from "api/api";
import { HomeEndpointsEnum } from "../constants/home.endpoints";

const list = (): Promise<AxiosResponse> => {
  return api.get(HomeEndpointsEnum.USERS);
};

export const userApi = {
  list,
};
