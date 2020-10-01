import React, { FC, memo } from "react";
import { useTranslation } from "features/localization/localization";

const HomeScreen: FC = () => {
  const { t } = useTranslation();

  return <h1>{t("Homepage")}</h1>;
};

export default memo(HomeScreen);
