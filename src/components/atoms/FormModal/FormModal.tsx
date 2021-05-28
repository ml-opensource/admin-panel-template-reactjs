import { useEffect } from "react";

import { Modal, Row, Col, Divider, ModalProps } from "antd";
import cx from "classnames";
import { useTranslation } from "react-i18next";

import Form, { FormProps } from "@app/components/atoms/Form/Form";
import useUnsavedPrompt from "@app/hooks/useUnsavedPrompt";

import Button from "../Button/Button";
import SpinWrapper from "../SpinWrapper/SpinWrapper";
import styles from "./FormModal.module.scss";

interface FormModalProps extends Omit<FormProps, "title"> {
  title?: ModalProps["title"];
  visible: ModalProps["visible"];
  className?: ModalProps["className"];
  width?: ModalProps["width"];
  children?: React.ReactNode;
  onClose: () => void;
  submitButtonText?: string;
  cancelButtonText?: string;
  destroyOnClose?: boolean;
  disableSubmit?: boolean;
  loadingSubmit?: boolean;
  loadingContent?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFinish?: (values: any) => void;
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
  disableSubmit,
  loadingSubmit,
  loadingContent,
  form,
  onFinish,
  ...formProps
}: FormModalProps) => {
  const { t } = useTranslation();
  const { setIsSubmitting } = useUnsavedPrompt({ form, visible });

  useEffect(() => {
    if (!visible) {
      setIsSubmitting(false);
    }
  }, [visible, setIsSubmitting]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: any) => {
    setIsSubmitting(true);
    onFinish?.(values);
  };

  // FIXME: coordinate with the new Form.tsx - if the new form is used, is this *reset* necessary then?
  const onAfterClose = () => form?.resetFields();

  const handleOnClose = () => {
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Modal
      className={cx(className, styles.modal)}
      visible={visible}
      title={title}
      width={width}
      footer={null}
      onCancel={handleOnClose}
      destroyOnClose={destroyOnClose}
      forceRender
      afterClose={onAfterClose}
    >
      <Form layout="vertical" form={form} onFinish={onSubmit} {...formProps}>
        <SpinWrapper loading={loadingContent}>
          <Row>{children}</Row>
        </SpinWrapper>
        <Divider className={styles.divider} />
        <Row justify="end">
          <Col>
            <Button danger onClick={handleOnClose}>
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

export default FormModal;
