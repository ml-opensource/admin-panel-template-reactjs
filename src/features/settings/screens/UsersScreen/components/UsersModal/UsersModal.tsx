import React, { memo } from "react";

import { Input } from "antd";
import { useTranslation } from "react-i18next/";
import { useParams } from "react-router-dom";

import FormModal, { Item } from "@app/components/atoms/FormModal/FormModal";

interface UsersModalProps {
  visible: boolean;
  onClose: () => void;
  onFinish?: () => void;
}

const UsersModal = memo(({ visible, onClose, onFinish }: UsersModalProps) => {
  const params = useParams<{ id: string }>();
  const { t } = useTranslation();

  const editMode = !!params.id;

  // TODO: Get User from API

  return (
    <FormModal
      title={
        editMode ? t("settingsUsers.editUser") : t("settingsUsers.addUser")
      }
      visible={visible}
      onClose={onClose}
      onFinish={onFinish}
    >
      <Item name="Username" label="Username">
        <Input type="text" />
      </Item>
    </FormModal>
  );
});

export default UsersModal;
