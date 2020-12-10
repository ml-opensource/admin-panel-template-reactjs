import React, { FC, memo, useEffect, useState } from "react";
import TableView from "components/TableView/TableView";
import { userApi } from "../../api/example.api";

const ExampleScreen: FC = () => {
  const [users, setUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  interface UserData {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  }

  const getUsers = async (newPage: number) => {
    const response = await userApi.list(newPage);
    const userData = response.data;

    setRowsPerPage(userData.per_page);
    setUsers(userData.data);
  };

  useEffect(() => {
    getUsers(page);
  }, [page]);

  const handlePaginationChange = (newPage: number) => {
    setPage(newPage + 1);
  };

  return (
    <div>
      <h1>Example Screen</h1>
      <TableView
        rows={users}
        title="Basic Table"
        tableProps={{ size: "medium", stickyHeader: false, padding: "default" }}
        onPaginationChange={handlePaginationChange}
        rowsPerPage={rowsPerPage}
        withPagination
        // withSorting

        // withFilter
        // withCheckbox
        // withSearch
      />
    </div>
  );
};

export default memo(ExampleScreen);
