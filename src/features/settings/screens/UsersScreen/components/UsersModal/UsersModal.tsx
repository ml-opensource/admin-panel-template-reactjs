import { memo, useEffect } from "react";

import { Col, Input } from "antd";
import _toNumber from "lodash/toNumber";
import { useTranslation } from "react-i18next/";

import { Item, useForm } from "@app/components/atoms/Form/Form";
import FormModal from "@app/components/atoms/FormModal/FormModal";
import { ItemModalEnum } from "@app/constants/route.constants";
import {
  clearUser,
  getUserById,
  isValidUserId,
} from "@app/features/settings/settings";
import useShowModal from "@app/hooks/useShowModal";
import { useAppDispatch, useAppSelector } from "@app/redux/store";

import { UserDef } from "../../../../types/user.types";

interface UsersModalProps {
  onClose: () => void;
  onSubmitted: () => void;
}

const UsersModal = memo(({ onClose, onSubmitted }: UsersModalProps) => {
  // Hooks
  const { t } = useTranslation();
  const { showModal, action, entryId } = useShowModal();
  const [form] = useForm<UserDef>();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector(state => ({
    user: state.users.user,
    loading: state.users.loading,
  }));

  // Constants
  const userId = _toNumber(entryId);
  const editMode = action === ItemModalEnum.EDIT;

  useEffect(() => {
    if (showModal) {
      if (editMode && isValidUserId(userId)) {
        dispatch(getUserById(userId));
      } else {
        dispatch(clearUser());
      }
    }
  }, [showModal, editMode, userId, dispatch]);

  const handleClose = () => onClose();

  const handleFinish = (values: Partial<UserDef>) => {
    // TODO: Create / Update user
    // eslint-disable-next-line no-console
    console.log(values);
    onSubmitted();
  };

  const getFormValues = () => user;

  return (
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
      values={getFormValues()}
      destroyOnClose
      loadingContent={loading}
    >
      <Col span={24}>
        <Item name="first_name" label={t("settingsUsers.inputFirstNameLabel")}>
          <Input
            type="text"
            placeholder={t("settingsUsers.inputFirstNamePlaceholder")}
          />
        </Item>
      </Col>
      <Col span={24}>
        <Item name="last_name" label={t("settingsUsers.inputLastNameLabel")}>
          <Input
            type="text"
            placeholder={t("settingsUsers.inputLastNamePlaceholder")}
          />
        </Item>
      </Col>
    </FormModal>
  );
});

export default UsersModal;
