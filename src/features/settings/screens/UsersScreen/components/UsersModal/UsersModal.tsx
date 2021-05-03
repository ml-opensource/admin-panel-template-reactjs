import { memo, useEffect } from "react";

import { Col, Form, Input } from "antd";
import { useTranslation } from "react-i18next/";

import FormModal, { Item } from "@app/components/atoms/FormModal/FormModal";
import { ItemModalEnum } from "@app/constants/route.constants";
import useShowModal from "@app/hooks/useShowModal";

import { UserDef } from "../../../../types/user.types";

interface UsersModalProps {
  onClose: () => void;
  onSubmitted: () => void;
}

const UsersModal = memo(({ onClose, onSubmitted }: UsersModalProps) => {
  const { t } = useTranslation();
  const { showModal, action, entryId } = useShowModal();
  const [form] = Form.useForm<UserDef>();

  const editMode = action === ItemModalEnum.EDIT;

  // TODO: Get User from API
  useEffect(() => {
    if (editMode) {
      // eslint-disable-next-line no-console
      console.log("user id", entryId);
    }
  }, [entryId, editMode]);

  const handleClose = () => {
    onClose();
  };

  const handleFinish = (values: Partial<UserDef>) => {
    // TODO: Create / Update users
    // eslint-disable-next-line no-console
    console.log(values);
    onSubmitted();
  };

  return !showModal ? null : (
    <FormModal
      title={
        editMode
          ? t("settingsUsers.editUserTitle")
          : t("settingsUsers.addUserTitle")
      }
      visible={showModal}
      onClose={handleClose}
      onFinish={handleFinish}
      form={form}
    >
      <Col span={24}>
        <Item name="Username" label="Username">
          <Input type="text" />
        </Item>
      </Col>
    </FormModal>
  );
});

export default UsersModal;
