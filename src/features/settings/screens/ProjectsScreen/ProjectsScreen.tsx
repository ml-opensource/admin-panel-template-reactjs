import { useTranslation } from "react-i18next";

import ContentLayout from "@app/components/layouts/ContentLayout/ContentLayout";

const ProjectsScreen = () => {
  const { t } = useTranslation();
  return (
    <ContentLayout header={{ title: t("settingsProjects.title") }}>
      <p>{t("settingsProjects.text")}</p>
    </ContentLayout>
  );
};

export default ProjectsScreen;
