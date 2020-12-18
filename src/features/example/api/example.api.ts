import { AxiosResponse } from "axios";
import { api } from "api/api";
import { ExampleEndpointsEnum } from "../constants/example.endpoints";

const list = (
  page = 1
  // orderBy = "id-asc",
  // id = 1,
  // name = "a"
): Promise<AxiosResponse> => {
  return api.get(
    // `${ExampleEndpointsEnum.USERS}?page=${page}&orderBy=${orderBy}&id=${id}&name=${name}`
    `${ExampleEndpointsEnum.USERS}?page=${page}`
    // https://reqres.in/api/users?page=1&id=3&email=%22tra%22&first_name=a&last_name=o
  );
};

export const userApi = {
  list,
};
