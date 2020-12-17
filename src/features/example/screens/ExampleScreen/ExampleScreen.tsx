import { Rows } from "components/TableView/TableView.types.example";
import React, { FC, memo, useEffect, useState } from "react";
import TableView from "components/TableView/TableView";
import { userApi } from "../../api/example.api";

interface UserData {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

const ExampleScreen: FC = () => {
  const [rows, setRows] = useState<Rows[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const columns = [
    "id",
    "name",
    { id: "color", disablePadding: false, label: "color", numeric: false },
    "pantone_value",
    "year",
  ];

  const getUsers = async (newPage: number) => {
    const { data } = await userApi.list(newPage);
    const userData = data;

    setRowsPerPage(userData.per_page);
    setRows(userData.data);
    setCount(userData.total);
  };

  useEffect(() => {
    getUsers(page);
  }, [page]);

  const handlePaginationChange = (newPage: number) => {
    setPage(newPage + 1);
  };

  const paginationProps = {
    withPagination: true,
    onPaginationChange: handlePaginationChange,
    rowsPerPage,
    count,
  };

  return (
    <div>
      <h1>Example Screen</h1>
      <TableView
        title="Basic Table"
        columns={columns}
        rows={rows}
        tableProps={{ size: "medium", stickyHeader: false, padding: "default" }}
        // pagination props starts here
        {...paginationProps}
        // pagination props ends here

        // withSorting
        // withFilter
        // withCheckbox
        withSearch
      />
    </div>
  );
};

export default memo(ExampleScreen);
