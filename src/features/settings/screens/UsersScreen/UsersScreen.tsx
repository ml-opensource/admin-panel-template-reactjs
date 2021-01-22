import { useTranslation } from "react-i18next";

const UsersScreen = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t("settingsUsers.title")}</h1>
      <p>{t("settingsUsers.text")}</p>
    </>
  );
};

export default UsersScreen;
