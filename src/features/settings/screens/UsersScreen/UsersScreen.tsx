import { useEffect, useMemo, useState } from "react";

import { Table } from "antd";
import { useTranslation } from "react-i18next";
import { useMount } from "react-use";

import Button from "@app/components/atoms/Button/Button";
import ScreenTitleView from "@app/components/molecules/ScreenTitleView/ScreenTitleView";
import TableView, {
  ActionMenuDef,
} from "@app/components/molecules/TableView/TableView";
import * as modalAction from "@app/helpers/modal.helper";
import useSearchParams from "@app/hooks/useSearchParams";

import { UserDef } from "../../types/user.types";
import styles from "./UsersScreen.module.scss";
import UsersModal from "./components/UsersModal/UsersModal";

enum ActionMenuEnum {
  DUPLICATE = "duplicate",
}

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

  const menu: ActionMenuDef = useMemo(
    () => [
      {
        key: ActionMenuEnum.DUPLICATE,
        label: t("settingsUsers.menuDuplicate"),
      },
    ],
    [t]
  );

  const handleDelete = (user: UserDef) => {
    // TODO: API to delete user
    console.log(user);
  };

  const handleDuplicate = (user: UserDef) => {
    // TODO: API to duplicate user
    console.log(user);
  };

  const handleEdit = (user: UserDef) => {
    updateSearchParams(modalAction.edit(user.id.toString()));
  };

  const handleAdd = () => {
    updateSearchParams(modalAction.add());
  };

  const handleCloseModal = () => {
    updateSearchParams(modalAction.close());
  };

  const handleSubmittedModal = () => {
    // TODO: fetch users again
    handleCloseModal();
  };

  const handleActionMenu = (key: string, user: UserDef) => {
    if (key === ActionMenuEnum.DUPLICATE) {
      handleDuplicate(user);
    }
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
        actionMenu={menu}
        onActionMenu={handleActionMenu}
        pagination={{
          pageSize: 2, // Example to force pagination for small data set
          current: pagination.page,
        }}
      >
        <Table.Column
          title={t("settingsUsers.columnName")}
          key="name"
          dataIndex="name"
          render={(name: UserDef["name"]) => name}
          sorter
          sortOrder={getOrderByDirection("name")}
        />
        <Table.Column
          title={t("settingsUsers.columnLastName")}
          key="lastName"
          dataIndex="lastName"
          render={(lastName: UserDef["lastName"]) => lastName}
          sorter
          sortOrder={getOrderByDirection("lastName")}
        />
      </TableView>
      <UsersModal
        onClose={handleCloseModal}
        onSubmitted={handleSubmittedModal}
      />
    </>
  );
};

export default UsersScreen;
