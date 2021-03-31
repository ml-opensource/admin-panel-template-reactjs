/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactNode } from "react";

import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Table, Space, Popconfirm, Tooltip, Menu, Dropdown } from "antd";
import { TablePaginationConfig, TableProps } from "antd/lib/table";
import {
  Key,
  SorterResult,
  TableCurrentDataSource,
} from "antd/lib/table/interface";
import { useTranslation } from "react-i18next";

import Button from "@app/components/atoms/Button/Button";
import { getOrderBy } from "@app/helpers/table.helper";
import useSearchParams from "@app/hooks/useSearchParams";

import styles from "./TableView.module.scss";

const { Column } = Table;

export type ActionMenuDef = { key: string; label: string }[];

export interface TableViewProps<T = {}> extends Omit<TableProps<T>, "columns"> {
  actionTitle?: string;
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
  onDuplicate?: (record: T) => void;
  extraActions?: (record: T) => ReactNode;
  actionMenu?: ActionMenuDef;
  onActionMenu?: (key: string, record: T) => void;
  actionWidth?: number | string;
}

const TableView = <T extends {}>({
  actionTitle,
  onEdit,
  onDelete,
  onDuplicate,
  children,
  onChange,
  actionMenu,
  onActionMenu,
  extraActions,
  actionWidth = 150,
  ...tableProps
}: TableViewProps<T>) => {
  const { t } = useTranslation();
  const { updateSearchParams } = useSearchParams();

  const handleOnChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, (Key | boolean)[] | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
    extra: TableCurrentDataSource<T>
  ) => {
    const orderBy = Array.isArray(sorter)
      ? undefined
      : (sorter.order &&
          sorter.columnKey &&
          getOrderBy(sorter.columnKey.toString(), sorter.order)) ||
        undefined;

    const page = pagination.current;
    const { pageSize } = pagination;

    updateSearchParams({
      orderBy,
      page,
      pageSize,
    });

    onChange?.(pagination, filters, sorter, extra);
  };

  const getMenu = (record: T) => (
    <Menu onClick={e => onActionMenu?.(e.key.toString(), record)}>
      {actionMenu?.map(({ key, label }) => (
        <Menu.Item key={key}>{label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Table rowKey="id" onChange={handleOnChange} {...tableProps}>
      {children}
      <Column<T>
        key="action"
        title={actionTitle}
        fixed="right"
        width={actionWidth}
        className={styles.actions}
        render={(_, record) => (
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
            {!!extraActions && extraActions(record)}
            {actionMenu && (
              <Dropdown
                key="more"
                overlay={getMenu(record)}
                trigger={["click"]}
              >
                <Tooltip title={t("default.moreTitle")}>
                  <Button shape="circle" icon={<MenuOutlined />} />
                </Tooltip>
              </Dropdown>
            )}
          </Space>
        )}
      />
    </Table>
  );
};

export default TableView;
