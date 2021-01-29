import { Form, Modal, Row, Col, Divider } from "antd";
import { FormProps } from "antd/lib/form";
import { useTranslation } from "react-i18next";

import Button from "../Button/Button";
import styles from "./FormModal.module.scss";

interface FormModalProps extends FormProps {
  title: string;
  visible: boolean;
  className?: string;
  width?: number;
  children?: React.ReactNode;
  onClose: () => void;
  submitButtonText?: string;
  cancelButtonText?: string;
  destroyOnClose?: boolean;
}

const FormModal = ({
  title,
  visible,
  className,
  width,
  children,
  onClose,
  submitButtonText,
  cancelButtonText,
  destroyOnClose,
  ...formProps
}: FormModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <Modal
      className={className}
      visible={visible}
      title={title}
      width={width}
      footer={null}
      onCancel={onClose}
      destroyOnClose={destroyOnClose}
      forceRender
    >
      <Form {...formProps} form={form}>
        <Row>{children}</Row>
        <Divider />
        <Row justify="end">
          <Col>
            <Button danger onClick={onClose}>
              {cancelButtonText ?? t("default.cancelTitle")}
            </Button>

            <Button
              className={styles.submitButton}
              type="primary"
              htmlType="submit"
            >
              {submitButtonText ?? t("default.saveTitle")}
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export const { Item } = Form;
export default FormModal;
