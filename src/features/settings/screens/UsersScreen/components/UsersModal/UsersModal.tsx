import React, { memo } from "react";

import { useParams } from "react-router-dom";

import FormModal from "@app/components/atoms/FormModal/FormModal";

interface UsersModalProps {
  visible: boolean;
  onClose: () => void;
  onFormSubmit: () => void;
}

const UsersModal = memo(
  ({ visible, onClose, onFormSubmit }: UsersModalProps) => {
    const params = useParams<{ id: string }>();

    // TODO: Get User from API

    return (
      <FormModal
        title="Users Modal"
        visible={visible}
        onClose={onClose}
        onFormSubmit={onFormSubmit}
      >
        Edit modal for user: {params.id}
      </FormModal>
    );
  }
);

export default UsersModal;
