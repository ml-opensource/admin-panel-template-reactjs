import React, { FC, memo } from "react";
import { useTranslation } from "react-i18next";

const HomeScreen: FC = () => {
  const { t, i18n } = useTranslation();

  return (
    // TODO: remove temporary content
    <>
      <h1>{t("Homepage")}</h1>
      <button type="button" onClick={() => i18n.changeLanguage("fr")}>
        French
      </button>
      <button type="button" onClick={() => i18n.changeLanguage("en")}>
        English
      </button>
    </>
  );
};

export default memo(HomeScreen);
