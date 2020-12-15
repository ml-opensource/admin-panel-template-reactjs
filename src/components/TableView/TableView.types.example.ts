import React from "react";
import { TableProps } from "@material-ui/core/Table";
import { useStyles } from "./TableView.styles";

export interface Data {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export interface TableViewProps {
  tableProps?: TableProps;
  rows: Data[];
  withPagination?: boolean;
  onPaginationChange?: (newPage: number) => void;
  rowsPerPage?: number;
  count?: number;
  withSorting?: boolean;
  title?: string;
  withFilter?: boolean;
  withCheckbox?: boolean;
  withSearch?: boolean;
}

export type Order = "asc" | "desc";

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export interface TableHeadViewProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  withSorting: boolean;
  withCheckbox: boolean;
  withFilter: boolean;
}
