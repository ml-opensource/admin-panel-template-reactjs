import { Form, Modal, Row, Col, Divider } from "antd";
import { useTranslation } from "react-i18next";

import Button from "../Button/Button";
import styles from "./FormModal.module.scss";

interface FormModalProps {
  title: string;
  visible: boolean;
  className?: string;
  width?: number;
  children?: React.ReactNode;
  onClose: () => void;
  onFormSubmit: (values?: any) => void;
  submitButtonText?: string;
  cancelButtonText?: string;
}

const FormModal = ({
  title,
  visible,
  className,
  width,
  children,
  onClose,
  onFormSubmit,
  submitButtonText,
  cancelButtonText,
}: FormModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      className={className}
      visible={visible}
      title={title}
      width={width}
      footer={null}
      onCancel={onClose}
    >
      <Form onFinish={onFormSubmit}>
        <Row>{children}</Row>
        <Divider />
        <Row justify="end">
          <Col>
            <Button
              danger
              onClick={onClose}
              buttonText={cancelButtonText ?? t("default.cancelSubmitForm")}
            />

            <Button
              type="primary"
              className={styles.submitButton}
              htmlType="submit"
              buttonText={submitButtonText ?? t("default.buttonSubmitForm")}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export const { Item } = Form;
export default FormModal;
