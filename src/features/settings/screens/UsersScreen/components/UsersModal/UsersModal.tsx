import React, { memo, useEffect } from "react";

import { Input } from "antd";
import { useTranslation } from "react-i18next/";

import FormModal, { Item } from "@app/components/atoms/FormModal/FormModal";
import useShowModal from "@app/hooks/useShowModal";

interface UsersModalProps {
  onClose: () => void;
  onFinish?: () => void;
}

const UsersModal = memo(({ onClose, onFinish }: UsersModalProps) => {
  const { t } = useTranslation();
  const { showModal, action, actionId } = useShowModal();

  const editMode = action === "edit";

  // TODO: Get User from API
  useEffect(() => {
    if (editMode) {
      console.log("user id", actionId);
    }
  }, [actionId, editMode]);

  return (
    <FormModal
      title={
        editMode ? t("settingsUsers.editUser") : t("settingsUsers.addUser")
      }
      visible={showModal}
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
