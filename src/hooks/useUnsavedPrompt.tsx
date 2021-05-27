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

  /**
   * Prompt -
   * canceling unload event and opening native dialogue
   * //TODO: consider if the beforeunload-part should be its own custom hook?
   */
  const prompt = (event: BeforeUnloadEvent) => {
    if (visible && form?.isFieldsTouched()) {
      const e = event || window.event;
      e.preventDefault();
      if (e) {
        e.returnValue = "";
      }
      return "";
    }
    return undefined;
  };

  useEffect(() => {
    window.addEventListener("beforeunload", prompt);
    return () => {
      window.removeEventListener("beforeunload", prompt);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (visible) {
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
    return undefined; // return if not visible
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
