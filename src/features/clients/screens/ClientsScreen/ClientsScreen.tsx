import { useCallback, useEffect } from "react";

import { useTranslation } from "react-i18next";

import ContentLayout from "@app/components/layouts/ContentLayout/ContentLayout";
import * as modalAction from "@app/helpers/modal.helper";
import useSearchParams from "@app/hooks/useSearchParams";
import { useAppDispatch } from "@app/redux/store";

import { getClients } from "../../redux/clients.slice";
import { Client } from "../../types/clients.types";
import ClientsModal from "./components/ClientsModal/ClientsModal";
import ClientsTable from "./components/ClientsTable/ClientsTable";

const ClientsScreen = () => {
  const { t } = useTranslation();
  const { search, updateSearchParams } = useSearchParams();
  const dispatch = useAppDispatch();

  const fetchData = useCallback(() => {
    dispatch(getClients({ page: search?.page, perPage: search?.pageSize }));
  }, [dispatch, search?.page, search?.pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEdit = (item: Client) =>
    updateSearchParams(modalAction.edit({ id: item.id.toString() }));

  const handleAdd = () => updateSearchParams(modalAction.add());

  const handleCloseModal = () => updateSearchParams(modalAction.close());

  const handleSubmittedModal = () => {
    fetchData();
    handleCloseModal();
  };

  const handleDelete = (item: Client) => {
    // eslint-disable-next-line no-console
    console.log("Delete item", item);
  };

  return (
    <ContentLayout header={{ title: t("clients.title") }}>
      <ClientsTable
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />

      {/* Modal to Create / Edit Client */}
      <ClientsModal
        onClose={handleCloseModal}
        onSubmitted={handleSubmittedModal}
      />
    </ContentLayout>
  );
};

export default ClientsScreen;
