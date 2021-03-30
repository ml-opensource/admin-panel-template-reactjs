import { useCallback, useEffect, useMemo } from "react";

import { Table } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Button from "@app/components/atoms/Button/Button";
import ScreenTitleView from "@app/components/molecules/ScreenTitleView/ScreenTitleView";
import TableView, {
  ActionMenuDef,
} from "@app/components/molecules/TableView/TableView";
import * as modalAction from "@app/helpers/modal.helper";
import useSearchParams from "@app/hooks/useSearchParams";
import { RootState } from "@app/redux/root-reducer";
import { useAppDispatch } from "@app/redux/store";

import { getUsers } from "../../redux/users.slice";
import { UserDef } from "../../types/user.types";
import styles from "./UsersScreen.module.scss";
import UserRoleModal, {
  ENTRY_TYPE_USER_ROLE,
} from "./components/UserRoleModal/UserRoleModal";
import UsersModal from "./components/UsersModal/UsersModal";

enum ActionMenuEnum {
  DUPLICATE = "duplicate",
}

const UsersScreen = () => {
  const { t } = useTranslation();
  const { users, loading, pagination } = useSelector(
    (state: RootState) => state.users
  );
  const { search, updateSearchParams, getOrderByDirection } = useSearchParams();
  const dispatch = useAppDispatch();

  const fetchData = useCallback(() => {
    dispatch(getUsers({ page: search?.page ?? 1 }));
  }, [dispatch, search?.page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
    updateSearchParams(modalAction.edit({ id: user.id.toString() }));
  };

  const handleAdd = () => {
    updateSearchParams(modalAction.add());
  };

  const handleUserRole = (user: UserDef) => {
    updateSearchParams(
      modalAction.edit({
        id: user.id.toString(),
        entryType: ENTRY_TYPE_USER_ROLE,
      })
    );
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
        dataSource={users}
        loading={loading}
        actionTitle={t("default.columnAction")}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
        extraActions={(user: UserDef) => [
          <Button
            key="user-role"
            onClick={() => handleUserRole(user)}
            noPadding
            type="link"
          >
            {t("settingsUsers.buttonUserRole")}
          </Button>,
        ]}
        actionMenu={menu}
        onActionMenu={handleActionMenu}
        pagination={pagination}
      >
        <Table.Column
          title={t("settingsUsers.columnName")}
          key="first_name"
          dataIndex="first_name"
          render={(firstName: UserDef["first_name"]) => firstName}
          sorter
          sortOrder={getOrderByDirection("name")}
        />
        <Table.Column
          title={t("settingsUsers.columnLastName")}
          key="last_name"
          dataIndex="last_name"
          render={(lastName: UserDef["last_name"]) => lastName}
          sorter
          sortOrder={getOrderByDirection("last_name")}
        />
      </TableView>
      <UsersModal
        onClose={handleCloseModal}
        onSubmitted={handleSubmittedModal}
      />
      <UserRoleModal
        onClose={handleCloseModal}
        onSubmitted={handleSubmittedModal}
      />
    </>
  );
};

export default UsersScreen;
