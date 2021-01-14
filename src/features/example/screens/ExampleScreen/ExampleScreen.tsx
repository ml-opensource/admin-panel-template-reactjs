import React, { FC, memo, useEffect, useState } from "react";

import Loader from "components/Loader/Loader";
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
  const [userData, setUserData] = useState<UserData>();

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

  const getUsers = async (newPage = 1) => {
    const { data } = await userApi.list(newPage);

    setUserData(data);
    setRows(data.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handlePaginationChange = (newPage: number) => {
    getUsers(newPage + 1);
  };

  const paginationProps = {
    withPagination: true,
    onPaginationChange: handlePaginationChange,
    rowsPerPage: userData ? userData.per_page : 0,
    count: userData ? userData.total : 0,
  };

  return (
    <div>
      <h1>Example Screen</h1>
      {userData ? (
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
      ) : (
        <Loader isFullScreen={false} />
      )}
    </div>
  );
};

export default memo(ExampleScreen);
