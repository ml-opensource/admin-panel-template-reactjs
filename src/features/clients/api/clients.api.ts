import { AxiosResponse } from "axios";

import { api } from "@app/api/api";
import { mockApi } from "@app/api/mock-api";
import mockedGetClientByIdData from "@app/dummy-data/client-by-id.json";
import mockedGetClientsData from "@app/dummy-data/clients.json";

import { ClientEndpointsEnum } from "../constants/clients.endpoints";
import {
  GetClientsParam,
  GetClientsResponse,
  GetClientByIdResponse,
} from "../types/clients.types";

// TODO: Mock data
mockApi
  .onGet(ClientEndpointsEnum.clients)
  .reply(
    () =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve([200, mockedGetClientsData]);
        }, 2000);
      })
  )
  .onGet(new RegExp(`${ClientEndpointsEnum.clients}/*`))
  .reply(
    () =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve([200, mockedGetClientByIdData]);
        }, 2000);
      })
  );

// API
export const getClientsApi = (
  params?: GetClientsParam
): Promise<AxiosResponse<GetClientsResponse>> => {
  return api.get(ClientEndpointsEnum.clients, { params });
};

export const getClientByIdApi = (
  id: number
): Promise<AxiosResponse<GetClientByIdResponse>> => {
  return api.get(`${ClientEndpointsEnum.clients}/${id}`);
};
