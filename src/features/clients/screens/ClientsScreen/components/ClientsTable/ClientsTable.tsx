import { Table } from "antd";
import { useTranslation } from "react-i18next";

import Button from "@app/components/atoms/Button/Button";
import TableView, {
  TableViewProps,
} from "@app/components/molecules/TableView/TableView";
import { Client } from "@app/features/clients/clients";
import { useAppSelector } from "@app/redux/store";

interface ClientsTableProps extends TableViewProps<Client> {
  onAdd?: () => void;
}

const ClientsTable = ({ onAdd, ...props }: ClientsTableProps) => {
  const { t } = useTranslation();
  const { clients, isClientsLoading, pagination } = useAppSelector(state => ({
    clients: state.clients.clients,
    isClientsLoading: state.clients.isClientsLoading,
    pagination: state.clients.pagination,
  }));

  return (
    <TableView
      dataSource={clients}
      loading={isClientsLoading}
      actionTitle={t("default.columnAction")}
      pagination={{
        ...pagination,
        showSizeChanger: true,
        pageSizeOptions: ["6", "8", "10", "15", "25"],
      }}
      title={() => (
        <Button type="primary" onClick={onAdd}>
          {t("clients.addClient")}
        </Button>
      )}
      {...props}
    >
      <Table.Column title={t("clients.name")} key="name" dataIndex="name" />
      <Table.Column
        title={t("clients.address")}
        key="address"
        dataIndex="address"
      />
      <Table.Column title={t("clients.sites")} key="sites" render={() => 1} />
    </TableView>
  );
};

export default ClientsTable;
