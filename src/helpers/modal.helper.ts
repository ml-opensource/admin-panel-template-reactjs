import { ItemModalEnum } from "@app/constants/route.constants";
import { SearchParamDef } from "@app/hooks/useSearchParams";

interface ModalAddDef {
  entryType?: string;
}

// Open a modal with an optional entry type
export const add = (config?: ModalAddDef): SearchParamDef => {
  const { entryType } = config ?? {};
  return {
    action: ItemModalEnum.ADD,
    entryId: undefined,
    entryType,
  };
};

interface ModalEditDef {
  id: string;
  entryType?: string;
}

// Edit a modal with an entry id and an optional entry type
export const edit = (config: ModalEditDef): SearchParamDef => {
  const { id, entryType } = config ?? {};
  return {
    action: ItemModalEnum.EDIT,
    entryId: id,
    entryType,
  };
};

// Close the modal
export const close = (): SearchParamDef => {
  return {
    action: undefined,
    entryId: undefined,
    entryType: undefined,
  };
};
