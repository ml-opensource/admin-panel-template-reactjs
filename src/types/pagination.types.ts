/* eslint-disable camelcase */
import { PaginationProps } from "antd";

export type ResponsePaginationDef = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

export type TablePaginationDef = Pick<
  PaginationProps,
  "current" | "pageSize" | "total"
>;
