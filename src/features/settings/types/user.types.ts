import { ResponsePaginationDef } from "@app/types/pagination.types";

export type UserDef = {
  id: number;
  firstName: string;
  lastName: string;
};

export type GetUsersResponseDef = {
  data: UserDef[];
} & ResponsePaginationDef;

export type GetUsersParamDef = {
  page?: ResponsePaginationDef["page"];
  perPage?: ResponsePaginationDef["perPage"];
};

export type GetUserByIdResponseDef = {
  data: UserDef;
};
