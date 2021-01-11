import { AxiosResponse } from "axios";

import { api } from "api/api";

import { ExampleEndpointsEnum } from "../constants/example.endpoints";

const list = (page = 1): Promise<AxiosResponse> => {
  return api.get(`${ExampleEndpointsEnum.USERS}?page=${page}`);
};

export const userApi = {
  list,
};
