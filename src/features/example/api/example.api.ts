import { AxiosResponse } from "axios";
import { api } from "api/api";
import { ExampleEndpointsEnum } from "../constants/example.endpoints";

const list = (page?: number): Promise<AxiosResponse> => {
  return api.get(
    `${ExampleEndpointsEnum.USERS}?page=${page}&orderBy=name-asc&name=a`
  );
};

export const userApi = {
  list,
};
