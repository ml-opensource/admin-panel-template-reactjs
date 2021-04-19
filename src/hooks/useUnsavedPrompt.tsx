/* eslint-disable @typescript-eslint/no-use-before-define */
import { useCallback, useEffect, useState } from "react";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, ModalFuncProps } from "antd";
import { FormInstance } from "antd/lib/form/Form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

interface UnsavedPromptProps extends Omit<ModalFuncProps, "onOk"> {
  form?: FormInstance;
}

const useUnsavedPrompt = ({ form, ...modalProps }: UnsavedPromptProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();
  const { t } = useTranslation();

  const onBlock = useCallback(
    tx => {
      console.log("history block");
      if (form?.isFieldsTouched() && !isSubmitting) {
        Modal.confirm({
          title: t("default.unsavedChangesTitle"),
          content: t("default.unsavedChangesText"),
          icon: <ExclamationCircleOutlined />,
          okType: "primary",
          cancelText: t("default.cancel"),
          onOk: () => {
            unblock();
            history.push(tx.pathname);
          },
          ...modalProps,
        });
        return false;
      }
      return unblock();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSubmitting]
  );

  console.log("mounted");
  const unblock = history.block(onBlock);
  console.log("unblock", unblock);

  useEffect(() => {
    return () => {
      console.log("unmounted");
      unblock();
      console.log("unblock", unblock);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { setIsSubmitting };
};

export default useUnsavedPrompt;
