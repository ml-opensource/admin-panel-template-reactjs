import { useEffect } from "react";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { FormInstance } from "antd/lib/form/Form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

interface UnsavedPromptProps {
  form?: FormInstance;
  // isSubmitting: boolean;
}

const useUnsavedPrompt = ({
  form,
}: // isSubmitting,
UnsavedPromptProps) => {
  const history = useHistory();
  const { t } = useTranslation();

  useEffect(() => {
    console.log("mounted");
    const unblock = history.block(tx => {
      console.log("isFieldsTouched", form?.isFieldsTouched());
      // console.log("inside isSubmitting touched", isSubmitting);
      if (form?.isFieldsTouched()) {
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
        });
        return false;
      }
      return unblock();
    });

    return () => {
      // console.log("isSubmitting touched", isSubmitting);
      console.log("unmounted");
      unblock();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useUnsavedPrompt;
