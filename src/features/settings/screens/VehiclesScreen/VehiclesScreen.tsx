import { useTranslation } from "react-i18next";

const VehiclesScreen = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t("settingsVehicles.title")}</h1>
      <p>{t("settingsVehicles.text")}</p>
    </>
  );
};

export default VehiclesScreen;
