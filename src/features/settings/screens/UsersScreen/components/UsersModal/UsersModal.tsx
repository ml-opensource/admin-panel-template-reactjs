import React, { memo } from "react";

import { Modal } from "antd";
import { useParams } from "react-router-dom";

interface UsersModalProps {
  visible: boolean;
  onClose: () => void;
}

const UsersModal = memo(({ visible, onClose }: UsersModalProps) => {
  const params = useParams<{ id: string }>();

  // TODO: Get User from API

  // TODO: Add a custom FormModal
  return (
    <Modal visible={visible} onCancel={onClose}>
      Edit modal for user: {params.id}
    </Modal>
  );
});

export default UsersModal;
