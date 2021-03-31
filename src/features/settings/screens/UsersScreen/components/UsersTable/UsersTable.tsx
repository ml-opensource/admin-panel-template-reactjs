import { useMemo } from "react";

import { Table } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import TableView, {
  ActionMenuDef,
  TableViewProps,
} from "@app/components/molecules/TableView/TableView";
import useSearchParams from "@app/hooks/useSearchParams";
import { RootState } from "@app/redux/root-reducer";

import { UserDef } from "../../../../types/user.types";

type UsersTableProps = TableViewProps<UserDef>;

export enum UsersActionMenuEnum {
  DUPLICATE = "duplicate",
}

const UsersTable = (props: UsersTableProps) => {
  const { t } = useTranslation();
  const { users, loading, pagination } = useSelector(
    (state: RootState) => state.users
  );
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
      {...props}
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
  );
};

export default UsersTable;
