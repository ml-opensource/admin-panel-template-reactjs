import { PaginationProps } from "antd";

import { CamelToSnake } from "@app/helpers/type.helper";

type ResponsePagination = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

export type ResponsePaginationDef = CamelToSnake<ResponsePagination>;

export type TablePaginationDef = Pick<
  PaginationProps,
  "current" | "pageSize" | "total"
>;
