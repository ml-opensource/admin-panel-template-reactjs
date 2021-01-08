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
    getUsers(1);
  }, []);

  const handlePaginationChange = (newPage: number) => {
    getUsers(newPage + 1);
  };

  const paginationProps = {
    withPagination: true,
    onPaginationChange: handlePaginationChange,
    rowsPerPage: data ? data.per_page : 0,
    count: data ? data.total : 0,
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
            "aria-label": "simple table",
          }}
          {...paginationProps}
          withCheckbox
          headerCheckboxAriaLabel="select all"
          withSearch
        />
      )}
    </div>
  );
};

export default memo(ExampleScreen);
