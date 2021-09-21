import { useMemo } from "react";

import { Table } from "antd";
import { useTranslation } from "react-i18next";

import Button from "@app/components/atoms/Button/Button";
import TableView, {
  ActionMenuDef,
  TableViewProps,
} from "@app/components/molecules/TableView/TableView";
import useSearchParams from "@app/hooks/useSearchParams";
import { useAppSelector } from "@app/redux/store";

import { UserDef } from "../../../../types/user.types";

interface UsersTableProps extends TableViewProps<UserDef> {
  onAdd?: () => void;
}

export enum UsersActionMenuEnum {
  DUPLICATE = "duplicate",
}

const UsersTable = ({ onAdd, ...props }: UsersTableProps) => {
  const { t } = useTranslation();
  const { users, loading, pagination } = useAppSelector(state => ({
    users: state.users.users,
    loading: state.users.loading,
    pagination: state.users.pagination,
  }));
  const { getOrderByDirection } = useSearchParams();

  const menu: ActionMenuDef = useMemo(
    () => [
      {
        key: UsersActionMenuEnum.DUPLICATE,
        label: t("settingsUsers.menuDuplicate"),
      },
    ],
    [t]
  );

  return (
    <TableView
      dataSource={users}
      loading={loading}
      actionTitle={t("default.columnAction")}
      actionMenu={menu}
      pagination={{
        ...pagination,
        showSizeChanger: true,
        pageSizeOptions: ["6", "8", "10", "15", "25"],
      }}
      title={() => (
        <Button type="primary" onClick={onAdd}>
          {t("settingsUsers.buttonAddUser")}
        </Button>
      )}
      {...props}
    >
      <Table.Column
        title={t("settingsUsers.columnName")}
        key="firstName"
        dataIndex="firstName"
        render={(firstName: UserDef["firstName"]) => firstName}
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
  );
};

export default UsersTable;
