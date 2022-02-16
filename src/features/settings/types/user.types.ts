import { CamelToSnake } from "@app/helpers/type.helper";
import { ResponsePaginationDef } from "@app/types/pagination.types";

type User = {
  id: number;
  firstName: string;
  lastName: string;
};

export type UserDef = CamelToSnake<User>;

export type GetUsersResponseDef = {
  data: UserDef[];
} & ResponsePaginationDef;

type GetUsersParam = {
  page?: ResponsePaginationDef["page"];
  perPage?: ResponsePaginationDef["per_page"];
};

export type GetUsersParamDef = CamelToSnake<GetUsersParam>;

export type GetUserByIdResponseDef = {
  data: UserDef;
};
