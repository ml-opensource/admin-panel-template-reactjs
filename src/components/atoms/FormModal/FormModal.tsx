import { Form, Modal, Row, Col, Divider } from "antd";
import { FormProps } from "antd/lib/form";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { useUnmount } from "react-use";

import useSafeReload from "@app/hooks/useSafeReload";
import useUnsavedPrompt from "@app/hooks/useUnsavedPrompt";

import Button from "../Button/Button";
import OptionalRender from "../OptionalRender/OptionalRender";
import SpinWrapper from "../SpinWrapper/SpinWrapper";
import styles from "./FormModal.module.scss";

interface FormModalProps extends FormProps {
  title: string;
  className?: string;
  width?: number;
  children?: React.ReactNode;
  onClose: () => void;
  submitButtonText?: string;
  cancelButtonText?: string;
  destroyOnClose?: boolean;
  disableSubmit?: boolean;
  loadingSubmit?: boolean;
  loadingContent?: boolean;
}

const FormModal = ({
  title,
  className,
  width,
  children,
  onClose,
  submitButtonText,
  cancelButtonText,
  destroyOnClose,
  disableSubmit,
  loadingSubmit,
  loadingContent,
  onFinish,
  form,
  ...formProps
}: FormModalProps) => {
  useSafeReload();
  const { t } = useTranslation();

  const { setIsSubmitting } = useUnsavedPrompt({ form });

  useUnmount(() => setIsSubmitting(false));

  const onFormSubmit = (values: unknown) => {
    setIsSubmitting(true);
    if (onFinish) {
      onFinish(values);
      form?.resetFields();
    }
  };

  return (
    <Modal
      className={cx(className, styles.modal)}
      visible
      title={title}
      width={width}
      footer={null}
      onCancel={onClose}
      destroyOnClose={destroyOnClose}
      forceRender
    >
      <Form
        layout="vertical"
        form={form}
        {...formProps}
        onFinish={onFormSubmit}
      >
        <SpinWrapper loading={loadingContent}>
          <Row>{children}</Row>
        </SpinWrapper>
        <Divider className={styles.divider} />
        <Row justify="end">
          <Col>
            <Button danger onClick={onClose}>
              {cancelButtonText ?? t("default.cancelTitle")}
            </Button>

            <Button
              className={styles.submitButton}
              type="primary"
              htmlType="submit"
              loading={loadingSubmit}
              disabled={loadingContent ?? disableSubmit}
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
export default OptionalRender(FormModal);
