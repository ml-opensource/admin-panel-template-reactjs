import React, { useEffect, useState } from "react";

import { Table } from "antd";
import { useTranslation } from "react-i18next";
import { generatePath, useHistory, useParams } from "react-router-dom";

import TableView from "@app/components/molecules/TableView/TableView";

import { SettingsPathsEnum } from "../../constants/settings.paths";
import UsersModal from "./components/UsersModal/UsersModal";

type UserDef = {
  id: number;
  name: string;
};

const UsersScreen = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    setShowEditModal(!!params.id);
  }, [params]);

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

  const handleEdit = (user: UserDef) => {
    history.push(
      generatePath(SettingsPathsEnum.USERS_EDIT, { id: user.id.toString() })
    );
  };
  const handleCloseModal = () => {
    history.push(SettingsPathsEnum.USERS);
    setShowEditModal(false);
  };

  return (
    <>
      <h1>{t("settingsUsers.title")}</h1>
      <p>{t("settingsUsers.text")}</p>
      <TableView
        dataSource={data}
        actionTitle={t("default.columnAction")}
        onEdit={handleEdit}
        onDelete={handleDelete}
      >
        <Table.Column
          key="name"
          dataIndex="name"
          title={t("settingsUsers.columnName")}
        />
      </TableView>
      <UsersModal visible={showEditModal} onClose={handleCloseModal} />
    </>
  );
};

export default UsersScreen;
