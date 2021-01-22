import { useEffect, useState } from "react";

import { updateLocalization } from "../helpers/localization.helpers";

interface LocalizationProps {
  shouldCall?: boolean;
}

function useLocalization({ shouldCall = true }: LocalizationProps) {
  const [loadingTranslation, setLoadingTranslation] = useState(shouldCall);

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        // Fetch the translations when app is started
        await updateLocalization();
      } finally {
        setLoadingTranslation(false);
      }
    };

    shouldCall && fetchTranslation();
  }, [shouldCall]);

  return {
    loadingTranslation,
  };
}

export default useLocalization;
