import { useTranslation } from "react-i18next";

const ProjectsScreen = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t("settingsProjects.title")}</h1>
      <p>{t("settingsProjects.text")}</p>
    </>
  );
};

export default ProjectsScreen;
