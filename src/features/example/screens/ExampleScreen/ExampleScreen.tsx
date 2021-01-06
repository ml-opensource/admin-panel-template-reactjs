import React, { FC, memo, useEffect, useState } from "react";

import TableView from "components/TableView/TableView";
import { Rows } from "components/TableView/TableView.types";

import { userApi } from "../../api/example.api";

interface UserData {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Rows[];
}

const ExampleScreen: FC = () => {
  const [rows, setRows] = useState<Rows[]>([]);
  const [data, setData] = useState<UserData>();
  const [page, setPage] = useState<number>(1);

  const columns = [
    {
      id: "id",
      disablePadding: false,
      label: "ID",
      numeric: false,
      isImage: false,
    },
    {
      id: "email",
      disablePadding: false,
      label: "Email",
      numeric: false,
      isImage: false,
    },
    {
      id: "first_name",
      disablePadding: false,
      label: "First Name",
      numeric: false,
      isImage: false,
    },
    {
      id: "last_name",
      disablePadding: false,
      label: "Last Name",
      numeric: false,
      isImage: false,
    },
    {
      id: "avatar",
      disablePadding: false,
      label: "Avatar",
      numeric: false,
      isImage: true,
    },
  ];

  const getUsers = async (newPage: number) => {
    // eslint-disable-next-line no-shadow
    const { data } = await userApi.list(newPage);
    const userData = data;

    setData(userData);
    setRows(userData.data);
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
      {data && (
        <TableView
          title="Basic Table"
          columns={columns}
          rows={rows}
          rowKey="id"
          tableProps={{
            size: "medium",
            stickyHeader: false,
            padding: "default",
          }}
          // pagination props starts here
          withPagination
          onPaginationChange={handlePaginationChange}
          rowsPerPage={data.per_page}
          count={data.total}
          // pagination props ends here
          withCheckbox
          withSearch
        />
      )}
    </div>
  );
};

export default memo(ExampleScreen);
