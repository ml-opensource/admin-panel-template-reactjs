/* eslint-disable @typescript-eslint/ban-types */
import React from "react";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Space, Button, Popconfirm, Tooltip } from "antd";
import { TableProps } from "antd/lib/table";
import { useTranslation } from "react-i18next";

import styles from "./TableView.module.scss";

const { Column } = Table;

interface TableViewProps<T = {}> extends Omit<TableProps<T>, "columns"> {
  actionTitle?: string;
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
}

const TableView = <T extends {}>({
  actionTitle,
  onEdit,
  onDelete,
  children,
  ...tableProps
}: TableViewProps<T>) => {
  const { t } = useTranslation();
  return (
    <Table rowKey="id" {...tableProps}>
      {children}
      <Column<T>
        key="action"
        title={actionTitle}
        fixed="right"
        width={150}
        className={styles.actions}
        render={(text, record) => (
          <Space size="middle">
            {!!onEdit && (
              <Tooltip title={t("default.editTitle")}>
                <Button
                  onClick={() => onEdit(record)}
                  shape="circle"
                  icon={<EditOutlined />}
                />
              </Tooltip>
            )}
            {!!onDelete && (
              <Popconfirm
                title={t("default.confirmDeleteTitle")}
                okText={t("default.confirmDeleteYes")}
                cancelText={t("default.confirmDeleteNo")}
                onConfirm={() => onDelete(record)}
                placement="left"
              >
                <Tooltip title={t("default.deleteTitle")}>
                  <Button shape="circle" icon={<DeleteOutlined />} />
                </Tooltip>
              </Popconfirm>
            )}
          </Space>
        )}
      />
    </Table>
  );
};

export default TableView;
