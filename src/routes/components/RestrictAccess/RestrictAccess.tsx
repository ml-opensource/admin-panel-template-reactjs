import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const RestrictAccess = () => {
  const { t } = useTranslation();
  return (
    <Result
      status="403"
      title={t("default.restrictAccessTitle")}
      subTitle={t("default.restrictAccessText")}
      extra={
        <Link to="/">
          <Button type="primary">{t("default.notFoundBackHomeButton")}</Button>
        </Link>
      }
    />
  );
};

export default RestrictAccess;
