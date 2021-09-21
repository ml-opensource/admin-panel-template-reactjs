import { memo, useEffect } from "react";

import { Col, Input } from "antd";
import _toNumber from "lodash/toNumber";
import { useTranslation } from "react-i18next/";

import { Item, useForm } from "@app/components/atoms/Form/Form";
import FormModal from "@app/components/atoms/FormModal/FormModal";
import { ItemModalEnum } from "@app/constants/route.constants";
import {
  Client,
  clearClient,
  getClientById,
} from "@app/features/clients/clients";
import useShowModal from "@app/hooks/useShowModal";
import { useAppDispatch, useAppSelector } from "@app/redux/store";

interface ClientsModalProps {
  onClose: () => void;
  onSubmitted: () => void;
}

const ClientsModal = memo(({ onClose, onSubmitted }: ClientsModalProps) => {
  // Hooks
  const { t } = useTranslation();
  const { showModal, action, entryId } = useShowModal();
  const [form] = useForm<Client>();
  const dispatch = useAppDispatch();
  const { client, isClientLoading } = useAppSelector(state => ({
    client: state.clients.client,
    isClientLoading: state.clients.isClientLoading,
  }));

  // Constants
  const id = _toNumber(entryId);
  const editMode = action === ItemModalEnum.EDIT;

  useEffect(() => {
    if (showModal) {
      if (editMode && !!id) {
        dispatch(getClientById(id));
      } else {
        dispatch(clearClient());
      }
    }
  }, [showModal, editMode, id, dispatch]);

  const handleClose = () => onClose();

  const handleFinish = (values: Partial<Client>) => {
    // TODO: Create / Update client
    // eslint-disable-next-line no-console
    console.log(values);
    onSubmitted();
  };

  return (
    <FormModal
      title={editMode ? t("clients.editClient") : t("clients.addClient")}
      visible={showModal}
      onClose={handleClose}
      onFinish={handleFinish}
      form={form}
      values={client}
      destroyOnClose
      loadingContent={isClientLoading}
    >
      <Col span={24}>
        <Item name="name" label={t("clients.name")}>
          <Input type="text" placeholder={t("clients.name")} />
        </Item>
      </Col>
      <Col span={24}>
        <Item name="address" label={t("clients.address")}>
          <Input type="text" placeholder={t("clients.address")} />
        </Item>
      </Col>
      <Col span={24}>
        <Item name="officeHoursFrom" label={t("clients.officeHoursFrom")}>
          <Input type="text" placeholder={t("clients.officeHoursFrom")} />
        </Item>
      </Col>
      <Col span={24}>
        <Item name="officeHoursTo" label={t("clients.officeHoursTo")}>
          <Input type="text" placeholder={t("clients.officeHoursTo")} />
        </Item>
      </Col>
      <Col span={24}>
        <Item name="phone" label={t("clients.phone")}>
          <Input type="text" placeholder={t("clients.phone")} />
        </Item>
      </Col>
      <Col span={24}>
        <Item name="web" label={t("clients.web")}>
          <Input type="text" placeholder={t("clients.web")} />
        </Item>
      </Col>
      <Col span={24}>
        <Item name="photo" label={t("clients.photo")}>
          <Input type="text" placeholder={t("clients.address")} />
        </Item>
      </Col>
    </FormModal>
  );
});

export default ClientsModal;
