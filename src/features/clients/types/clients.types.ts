import { ResponsePaginationDef } from "@app/types/pagination.types";

export type Client = {
  id: number;
  name: string;
  address: string;
  officeHoursFrom: string;
  officeHoursTo: string;
  phone: string;
  web: string;
  photo: string;
};

export type GetClientsParam = {
  page?: ResponsePaginationDef["page"];
  perPage?: ResponsePaginationDef["perPage"];
};

export type GetClientsResponse = {
  data: Client[];
  pagination: ResponsePaginationDef;
};

export type GetClientByIdResponse = {
  data: Client;
};
