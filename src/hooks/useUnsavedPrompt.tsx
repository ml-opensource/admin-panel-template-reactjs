import { useEffect, useState } from "react";

import { FormInstance } from "antd/lib/form/Form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { modalConfirm } from "@app/components/atoms/ModalConfirm/ModalConfirm";

interface UnsavedPromptProps {
  form?: FormInstance;
  visible?: boolean;
  title?: string;
  text?: string;
  asyncForm?: boolean; // FIXME: remove once everyone uses the new Form
}

const useUnsavedPrompt = ({
  form,
  title,
  text,
  visible,
  asyncForm,
}: UnsavedPromptProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();
  const { t } = useTranslation();

  const prompt = () => {
    setIsSubmitting(false);
  };
  useEffect(() => {
    window.addEventListener("beforeunload", prompt);
    return () => {
      window.removeEventListener("beforeunload", prompt);
    };
  }, []);

  // const promptConfirmation = () => {};
  useEffect(() => {
    if (visible) {
      // window.addEventListener("beforeunload", onCancel);
      const unblock = history.block(tx => {
        if (form?.isFieldsTouched() && !isSubmitting) {
          modalConfirm(t, {
            title: title ?? t("default.unsavedChangesTitle"),
            content: text ?? t("default.unsavedChangesText"),
            cancelText: t("default.unsavedChangesCancelTitle"),
            okText: t("default.unsavedChangesConfirmTitle"),
            onOk: () => {
              unblock();
              history.push(tx.pathname);
              if (asyncForm) form.resetFields();
            },
          });
          return false;
        }
        return unblock();
      });
      return () => {
        unblock();
      };
    }
    // window.removeEventListener("beforeunload", onCancel);

    // return if not visible
    return undefined;
  }, [
    visible,
    form,
    history,
    history.location,
    isSubmitting,
    t,
    text,
    title,
    asyncForm,
  ]);

  return { setIsSubmitting };
};

export default useUnsavedPrompt;
