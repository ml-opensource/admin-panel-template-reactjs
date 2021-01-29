import React, { memo } from "react";

import { Input } from "antd";
import { useTranslation } from "react-i18next/";
import { useParams } from "react-router-dom";

import FormModal, { Item } from "@app/components/atoms/FormModal/FormModal";
import { SettingsPathsEnum } from "@app/features/settings/settings";
import useShowModal from "@app/hooks/useShowModal";

interface UsersModalProps {
  onClose: () => void;
  onFinish?: () => void;
}

const UsersModal = memo(({ onClose, onFinish }: UsersModalProps) => {
  const { t } = useTranslation();
  const params = useParams<{ id: string }>();
  const editMode = !!params.id;

  const { showModal } = useShowModal({
    editMode,
    showForPath: SettingsPathsEnum.USERS_CREATE,
  });

  // TODO: Get User from API

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
