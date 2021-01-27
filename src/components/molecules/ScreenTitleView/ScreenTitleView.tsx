import { useTranslation } from "react-i18next";

import Button from "@app/components/atoms/Button/Button";

import styles from "./ScreenTitleView.module.scss";

interface ScreenTitleViewProps {
  mainTitle?: string;
}

const ScreenTitleView = ({ mainTitle }: ScreenTitleViewProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className={styles.title}>{mainTitle}</h1>
      <div className={styles.buttonContainer}>
        <Button
          type="primary"
          size="large"
          buttonText={t("default.buttonText")}
        />
      </div>
    </div>
  );
};

export default ScreenTitleView;
