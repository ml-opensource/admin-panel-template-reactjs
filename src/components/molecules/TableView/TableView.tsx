/* eslint-disable @typescript-eslint/ban-types */
import React from "react";

import { CopyOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Space, Button, Popconfirm, Tooltip } from "antd";
import { TablePaginationConfig, TableProps } from "antd/lib/table";
import {
  Key,
  SorterResult,
  TableCurrentDataSource,
} from "antd/lib/table/interface";
import qs from "query-string";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

import { getOrderBy } from "@app/helpers/table.helper";

import styles from "./TableView.module.scss";

const { Column } = Table;

interface TableViewProps<T = {}> extends Omit<TableProps<T>, "columns"> {
  actionTitle?: string;
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
  onDuplicate?: (record: T) => void;
}

const TableView = <T extends {}>({
  actionTitle,
  onEdit,
  onDelete,
  onDuplicate,
  children,
  onChange,
  ...tableProps
}: TableViewProps<T>) => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();

  const handleOnChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, (Key | boolean)[] | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
    extra: TableCurrentDataSource<T>
  ) => {
    // Keep the old search params
    const currentSearch = qs.parse(location.search);

    const orderBy = Array.isArray(sorter)
      ? undefined
      : (sorter.order &&
          sorter.columnKey &&
          getOrderBy(sorter.columnKey.toString(), sorter.order)) ||
        undefined;

    // and overwrite or add new values
    const values = {
      ...currentSearch,
      orderBy,
    };

    history.push({
      pathname: location.pathname,
      search: qs.stringify(values, { arrayFormat: "comma" }),
    });

    onChange?.(pagination, filters, sorter, extra);
  };

  return (
    <Table rowKey="id" onChange={handleOnChange} {...tableProps}>
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
            {!!onDuplicate && (
              <Tooltip title={t("default.duplicateTitle")}>
                <Button
                  onClick={() => onDuplicate(record)}
                  shape="circle"
                  icon={<CopyOutlined />}
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
