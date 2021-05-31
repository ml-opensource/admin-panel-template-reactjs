import { useEffect, useState } from "react";

import { ItemModalEnum } from "@app/constants/route.constants";

import useSearchParams from "./useSearchParams";

interface ShowModalConfig {
  customEntryType?: string;
}

function useShowModal(config?: ShowModalConfig) {
  const { customEntryType } = config ?? {};
  const [showModal, setShowModal] = useState(false);

  const { search } = useSearchParams();
  const action = search?.action;
  const entryId = search?.entryId;
  const entryType = search?.entryType;

  useEffect(() => {
    setShowModal(
      (action === ItemModalEnum.EDIT || action === ItemModalEnum.ADD) &&
        entryType === customEntryType
    );
  }, [action, customEntryType, entryType]);

  return { showModal, action, entryId, entryType };
}

export default useShowModal;
