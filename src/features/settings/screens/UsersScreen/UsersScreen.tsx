import { useState } from "react";

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
  const [data, setData] = useState<UserDef[]>([]);
  const { t } = useTranslation();

  const { updateSearchParams, getOrderByDirection } = useSearchParams();

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
        name: "Jane",
        lastName: "Dane",
      },
    ]);
  });

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
          {t("settingsUsers.addUser")}
        </Button>
      </div>
      <TableView
        dataSource={data}
        actionTitle={t("default.columnAction")}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
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
