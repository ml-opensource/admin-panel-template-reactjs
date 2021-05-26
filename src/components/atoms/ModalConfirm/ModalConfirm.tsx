import { Modal, ModalFuncProps } from "antd";
import { TFunction } from "react-i18next";

const { confirm } = Modal;

export const modalConfirm = (
  t: TFunction<"translation">,
  { cancelText, okText, ...rest }: ModalFuncProps
) => {
  return confirm({
    cancelText: cancelText ?? t("default.cancelTitle"),
    okText: okText ?? t("default.okTitle"),
    width: 456,
    ...rest,
    okButtonProps: { type: "link" },
    cancelButtonProps: { type: "primary" },
  });
};
