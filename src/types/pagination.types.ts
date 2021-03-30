/* eslint-disable camelcase */
import { PaginationProps } from "antd";

export type ResponsePaginationDef = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

export type PaginationDef = {
  current: PaginationProps["current"];
  pageSize: PaginationProps["pageSize"];
  total: PaginationProps["total"];
};
