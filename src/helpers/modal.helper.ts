import { ItemModalEnum } from "@app/constants/route.constants";

export const add = () => {
  return {
    action: ItemModalEnum.ADD,
    actionId: undefined,
  };
};
export const edit = (id: string) => {
  return {
    action: ItemModalEnum.EDIT,
    actionId: id,
  };
};

export const close = () => {
  return {
    actionId: undefined,
    action: undefined,
  };
};
