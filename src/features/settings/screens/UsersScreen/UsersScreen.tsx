import { useEffect, useState } from "react";

import { Table } from "antd";
import { useTranslation } from "react-i18next";
import { useMount } from "react-use";

import Button from "@app/components/atoms/Button/Button";
import ScreenTitleView from "@app/components/molecules/ScreenTitleView/ScreenTitleView";
import TableView from "@app/components/molecules/TableView/TableView";
import { ItemModalEnum } from "@app/constants/route.constants";
import useSearchParams from "@app/hooks/useSearchParams";

import styles from "./UsersScreen.module.scss";
import UsersModal from "./components/UsersModal/UsersModal";

type UserDef = {
  id: number;
  name: string;
  lastName: string;
};

const UsersScreen = () => {
  const [pagination, setPagination] = useState<{
    page: number;
  }>({
    page: 1,
  });
  const [data, setData] = useState<UserDef[]>([]);
  const { t } = useTranslation();

  const { search, updateSearchParams, getOrderByDirection } = useSearchParams();

  useMount(() => {
    // TODO: Add api call to get users
    setData([
      {
        id: 0,
        name: "John",
        lastName: "Doe",
      },
      {
        id: 1,
        name: "Jane 1",
        lastName: "Dane",
      },
      {
        id: 2,
        name: "Jane 2",
        lastName: "Dane",
      },
      {
        id: 3,
        name: "Jane 3",
        lastName: "Dane",
      },
    ]);
  });

  useEffect(() => {
    // TODO: when pagination changes call api
    setPagination({
      page: search?.page ?? 1,
    });
  }, [search]);

  const handleDelete = (user: UserDef) => {
    // TODO: API to delete user
    console.log(user);
  };

  const handleDuplicate = (user: UserDef) => {
    // TODO: API to duplicate user
    console.log(user);
  };

  const handleEdit = (user: UserDef) => {
    updateSearchParams({
      action: ItemModalEnum.EDIT,
      actionId: user.id.toString(),
    });
  };

  const handleAdd = () => {
    updateSearchParams({
      action: ItemModalEnum.ADD,
      actionId: undefined,
    });
  };

  const handleCloseModal = () => {
    updateSearchParams({
      actionId: undefined,
      action: undefined,
    });
  };

  return (
    <>
      <ScreenTitleView title={t("settingsUsers.title")} />
      <div className={styles.buttonContainer}>
        <Button type="primary" size="large" onClick={handleAdd}>
          {t("settingsUsers.buttonAddUser")}
        </Button>
      </div>
      <TableView
        dataSource={data}
        actionTitle={t("default.columnAction")}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
        pagination={{
          pageSize: 2, // Example to force pagination for small data set
          current: pagination.page,
        }}
      >
        <Table.Column
          key="name"
          dataIndex="name"
          title={t("settingsUsers.columnName")}
          sorter
          sortOrder={getOrderByDirection("name")}
        />
        <Table.Column
          key="lastName"
          dataIndex="lastName"
          title={t("settingsUsers.columnLastName")}
          sorter
          sortOrder={getOrderByDirection("lastName")}
        />
      </TableView>
      <UsersModal onClose={handleCloseModal} />
    </>
  );
};

export default UsersScreen;
