import { useEffect, useState } from "react";

import { ItemModalEnum } from "@app/constants/route.constants";

import useSearchParams from "./useSearchParams";

function useShowModal() {
  const [showModal, setShowModal] = useState(false);

  const { search } = useSearchParams();
  const action = search?.action;
  const actionId = search?.actionId;

  useEffect(() => {
    setShowModal(action === ItemModalEnum.EDIT || action === ItemModalEnum.ADD);
  }, [action]);

  return { showModal, action, actionId };
}

export default useShowModal;
