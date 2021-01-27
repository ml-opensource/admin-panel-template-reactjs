import Button from "@app/components/atoms/Button/Button";

import styles from "./ScreenTitleView.module.scss";

interface ScreenTitleViewProps {
  screenTitle?: string;
}

const ScreenTitleView = ({ screenTitle }: ScreenTitleViewProps) => {
  return (
    <div>
      <h1 className={styles.title}>{screenTitle}</h1>
      <Button type="primary" buttonText="Click me" size="large" />
    </div>
  );
};

export default ScreenTitleView;
