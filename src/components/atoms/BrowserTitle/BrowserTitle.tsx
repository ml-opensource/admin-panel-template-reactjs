import { memo } from "react";

import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

interface Props {
  /** Meta title (optional) */
  title?: string;
}

const BrowserTitle = ({ title }: Props) => {
  const { t } = useTranslation();
  return (
    <Helmet>
      <title>
        {(!!title && `${title} | `) || ""}
        {t("default.title")}
      </title>
    </Helmet>
  );
};

export default memo(BrowserTitle);
