import { useTranslation } from "react-i18next";

const HomeScreen = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t("home.title")}</h1>
      <p>{t("home.text")}</p>
    </>
  );
};

export default HomeScreen;
