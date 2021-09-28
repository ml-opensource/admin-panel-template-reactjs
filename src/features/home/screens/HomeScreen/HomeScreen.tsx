import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import ContentLayout from "@app/components/layouts/ContentLayout/ContentLayout";
import commonStyles from "@app/styles/common.module.scss";

const { Title } = Typography;

const HomeScreen = () => {
  const { t } = useTranslation();
  return (
    <ContentLayout header={{ title: t("home.title") }}>
      <Title>1.Typography</Title>
      <p className={commonStyles.font1}>Font 1</p>
      <p className={commonStyles.font2}>Font 2</p>
      <p className={commonStyles.font3}>Font 3</p>
      <p className={commonStyles.font4}>Font 4</p>
      <p className={commonStyles.font5}>Font 5</p>
      <p className={commonStyles.font6}>Font 6</p>
      <p className={commonStyles.font7}>Font 7</p>
      <p className={commonStyles.font8}>Font 8</p>
    </ContentLayout>
  );
};

export default HomeScreen;
