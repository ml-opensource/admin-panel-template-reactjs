import { Modal, ModalFuncProps } from "antd";
import { TFunction } from "react-i18next";

const { confirm } = Modal;

export const modalConfirm = (
  t: TFunction<"translation">,
  {
    cancelText = t("default.cancelTitle"),
    okText = t("default.okTitle"),
    ...rest
  }: ModalFuncProps
) => {
  return confirm({
    cancelText,
    okText,
    width: 456,
    ...rest,
  });
};
