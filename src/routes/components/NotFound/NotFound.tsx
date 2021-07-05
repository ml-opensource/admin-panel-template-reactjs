import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Result
      icon={<QuestionCircleOutlined />}
      title={t("default.notFoundTitle")}
      subTitle={t("default.notFoundText")}
      extra={
        <Link to="/">
          <Button type="primary">{t("default.notFoundBackHomeButton")}</Button>
        </Link>
      }
    />
  );
};

export default NotFound;
