import { useCallback, useEffect } from "react";

import { useTranslation } from "react-i18next";

import Button from "@app/components/atoms/Button/Button";
import ScreenTitleView from "@app/components/molecules/ScreenTitleView/ScreenTitleView";
import * as modalAction from "@app/helpers/modal.helper";
import useSearchParams from "@app/hooks/useSearchParams";
import { useAppDispatch } from "@app/redux/store";

import { getUsers } from "../../redux/users.slice";
import { UserDef } from "../../types/user.types";
import styles from "./UsersScreen.module.scss";
import UserRoleModal, {
  ENTRY_TYPE_USER_ROLE,
} from "./components/UserRoleModal/UserRoleModal";
import UsersFilter, {
  UsersFilterDef,
} from "./components/UsersFilter/UsersFilter";
import UsersModal from "./components/UsersModal/UsersModal";
import UsersTable, {
  UsersActionMenuEnum,
} from "./components/UsersTable/UsersTable";

const UsersScreen = () => {
  const { t } = useTranslation();
  const { search, updateSearchParams } = useSearchParams<UsersFilterDef>();
  const dispatch = useAppDispatch();

  const fetchData = useCallback(() => {
    dispatch(getUsers({ page: search?.page, per_page: search?.pageSize }));
  }, [dispatch, search?.page, search?.pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
    fetchData();
    handleCloseModal();
  };

  const handleDelete = (user: UserDef) => {
    // TODO: API to delete user
    // eslint-disable-next-line no-console
    console.log("delete user", user);
  };

  const handleDuplicate = (user: UserDef) => {
    // TODO: API to duplicate user
    // eslint-disable-next-line no-console
    console.log("duplicate user", user);
  };

  const handleActionMenu = (key: string, user: UserDef) => {
    if (key === UsersActionMenuEnum.DUPLICATE) {
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
      <UsersFilter />
      <UsersTable
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
        onActionMenu={handleActionMenu}
      />
      {/* Modal to Create / Edit User */}
      <UsersModal
        onClose={handleCloseModal}
        onSubmitted={handleSubmittedModal}
      />
      {/* Modal to Update User Role */}
      <UserRoleModal
        onClose={handleCloseModal}
        onSubmitted={handleSubmittedModal}
      />
    </>
  );
};

export default UsersScreen;
