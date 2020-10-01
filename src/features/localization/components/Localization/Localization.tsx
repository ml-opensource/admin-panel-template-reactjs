import React, { FC, memo, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../logic/localization.logic";
import { LanguagesEnum } from "../../constants/languages.keys";

interface LocalizationProps {
  /**
   * Wrapper for the component that needs localization applied to.
   * Usually should be the <App /> component in the index.tsx file
   */
  children: React.ReactNode;
  /**
   * The default language for the admin panel
   */
  defaultLanguage?: string;
}

const Localization: FC<LocalizationProps> = ({
  children,
  defaultLanguage = LanguagesEnum.ENGLISH,
}) => {
  useEffect(() => {
    i18n.changeLanguage(defaultLanguage);
  }, [defaultLanguage]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default memo(Localization);
