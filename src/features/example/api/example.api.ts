import { AxiosResponse } from "axios";
import { api } from "api/api";
import { ExampleEndpointsEnum } from "../constants/example.endpoints";

const list = (): Promise<AxiosResponse> => {
  return api.get(ExampleEndpointsEnum.USERS);
};

export const userApi = {
  list,
};
