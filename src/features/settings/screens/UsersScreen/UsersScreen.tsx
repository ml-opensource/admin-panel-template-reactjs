import React, { useEffect, useState } from "react";

import { Table } from "antd";
import { useTranslation } from "react-i18next";
import {
  generatePath,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

import Button from "@app/components/atoms/Button/Button";
import ScreenTitleView from "@app/components/molecules/ScreenTitleView/ScreenTitleView";
import TableView from "@app/components/molecules/TableView/TableView";

import { SettingsPathsEnum } from "../../constants/settings.paths";
import styles from "./UsersScreen.module.scss";
import UsersModal from "./components/UsersModal/UsersModal";

type UserDef = {
  id: number;
  name: string;
};

const UsersScreen = () => {
  const [showUserModal, setShowUserModal] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();

  const params = useParams<{ id: string }>();

  useEffect(() => {
    setShowUserModal(
      location.pathname === SettingsPathsEnum.USERS_CREATE || !!params.id
    );
  }, [location.pathname, params]);

  // TODO: Add api call to get users
  const data: UserDef[] = [
    {
      id: 0,
      name: "John",
    },
    {
      id: 1,
      name: "Jane",
    },
  ];

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
    setShowUserModal(false);
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
        />
      </TableView>
      <UsersModal visible={showUserModal} onClose={handleCloseModal} />
    </>
  );
};

export default UsersScreen;
