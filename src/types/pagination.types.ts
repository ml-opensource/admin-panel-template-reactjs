import { PaginationProps } from "antd";

export type ResponsePaginationDef = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

export type TablePaginationDef = Pick<
  PaginationProps,
  "current" | "pageSize" | "total"
>;
