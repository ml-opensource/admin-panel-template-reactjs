import { useState } from "react";

import { Table } from "antd";
import qs from "query-string";
import { useTranslation } from "react-i18next";
import { generatePath, useHistory, useLocation } from "react-router-dom";
import { useMount } from "react-use";

import Button from "@app/components/atoms/Button/Button";
import ScreenTitleView from "@app/components/molecules/ScreenTitleView/ScreenTitleView";
import TableView from "@app/components/molecules/TableView/TableView";
import { getOrderByExtraction } from "@app/helpers/table.helper";

import { SettingsPathsEnum } from "../../constants/settings.paths";
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
  const history = useHistory();
  const location = useLocation();

  const currentSearch = qs.parse(location.search);
  // TODO: return this in a custom hook, together with pagination and other stuff
  const orderBy = getOrderByExtraction((currentSearch.orderBy as string) || "");

  // TODO: make this a reusable function
  const getOrderBy = (key: string) => {
    return (orderBy?.key === key && orderBy?.direction) || undefined;
  };

  useMount(() => {
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

  // TODO: Add api call to get users

  const handleDelete = (user: UserDef) => {
    // TODO: API to delete user
    console.log(user);
  };

  const handleDuplicate = (user: UserDef) => {
    // TODO: API to duplicate user
    console.log(user);
  };

  const handleEdit = (user: UserDef) => {
    history.push(
      generatePath(SettingsPathsEnum.USERS_EDIT, { id: user.id.toString() })
    );
  };
  const handleCloseModal = () => {
    history.push(SettingsPathsEnum.USERS);
  };

  return (
    <>
      <ScreenTitleView title={t("settingsUsers.title")} />
      <div className={styles.buttonContainer}>
        <Button type="primary" size="large" to={SettingsPathsEnum.USERS_CREATE}>
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
          sortOrder={getOrderBy("name")}
        />
        <Table.Column
          key="lastName"
          dataIndex="lastName"
          title={t("settingsUsers.columnLastName")}
          sorter
          sortOrder={getOrderBy("lastName")}
        />
      </TableView>
      <UsersModal onClose={handleCloseModal} />
    </>
  );
};

export default UsersScreen;
