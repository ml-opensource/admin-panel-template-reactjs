import { SortOrder } from "antd/lib/table/interface";

import {
  TablePaginationDef,
  ResponsePaginationDef,
} from "@app/types/pagination.types";
import { OrderByDef } from "@app/types/table.types";

/** The divider used in the url for the orderBy search param */
const ORDER_BY_DIVIDER = "_";

/**
 * Takes the raw orderBy string from the search query
 * and splits it and extracts key and direction
 */
export const getOrderByExtraction = (orderBy: string): OrderByDef => {
  const orderBySplit = orderBy.split(ORDER_BY_DIVIDER);
  const orderByKey = orderBySplit?.[0] || "";
  const orderByDirection = (orderBySplit?.[1] || undefined) as
    | SortOrder
    | undefined;

  const orderByExtraction: OrderByDef = {
    key: orderByKey,
    direction: orderByDirection,
  };

  return orderByExtraction;
};

/**
 * Takes the orderBy key and direction
 * and combines them to a single string for the search query
 */
export const getOrderBy = (orderByKey: string, orderByDirection: SortOrder) => {
  return `${orderByKey}${ORDER_BY_DIVIDER}${orderByDirection}`;
};

export const mapPagination = (
  pagination: ResponsePaginationDef
): TablePaginationDef => {
  return {
    current: pagination?.page ?? 1,
    pageSize: pagination?.per_page ?? 10,
    total: pagination?.total ?? 0,
  };
};
