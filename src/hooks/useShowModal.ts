import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

interface UseShowModalProps {
  /**
   * Show modal if in edit mode (optional)
   */
  editMode?: boolean;
  /**
   * Show modal if current path is equal to create path (optional)
   */
  showForPath?: string;
}

function useShowModal({ editMode, showForPath }: UseShowModalProps) {
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setShowModal(location.pathname === showForPath || !!editMode);
  }, [location.pathname, editMode, showForPath]);

  return { showModal };
}

export default useShowModal;
