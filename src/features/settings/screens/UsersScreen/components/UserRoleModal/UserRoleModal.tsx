import { memo, useEffect } from "react";

import { Col, Form, Input } from "antd";
import { useTranslation } from "react-i18next/";

import FormModal, { Item } from "@app/components/atoms/FormModal/FormModal";
import { ItemModalEnum } from "@app/constants/route.constants";
import useShowModal from "@app/hooks/useShowModal";

import { UserDef } from "../../../../types/user.types";

export const ENTRY_TYPE_USER_ROLE = "user-role";

interface UserRoleModalProps {
  onClose: () => void;
  onSubmitted: () => void;
}

const UserRoleModal = memo(({ onClose, onSubmitted }: UserRoleModalProps) => {
  const { t } = useTranslation();
  const { showModal, action, entryId } = useShowModal({
    customEntryType: ENTRY_TYPE_USER_ROLE,
  });
  const [form] = Form.useForm();

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
    // TODO: Update user role
    // eslint-disable-next-line no-console
    console.log(values);
    onSubmitted();
  };

  return (
    <FormModal
      visible={showModal}
      title={t("settingsUsers.editUserRole")}
      onClose={handleClose}
      onFinish={handleFinish}
      form={form}
    >
      <Col span={24}>
        <Item name="role" label="User Role">
          <Input type="text" />
        </Item>
      </Col>
    </FormModal>
  );
});

export default UserRoleModal;
