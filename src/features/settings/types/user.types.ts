import { ResponsePaginationDef } from "@app/types/pagination.types";

/* eslint-disable camelcase */
export type UserDef = {
  id: number;
  first_name: string;
  last_name: string;
};

export type GetUsersResponseDef = {
  data: UserDef[];
} & ResponsePaginationDef;

export type GetUsersParamDef = {
  page?: ResponsePaginationDef["page"];
  per_page?: ResponsePaginationDef["per_page"];
};

export type GetUserByIdResponseDef = {
  data: UserDef;
};
