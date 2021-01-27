import styles from "./ScreenTitleView.module.scss";

interface ScreenTitleViewProps {
  mainTitle?: string;
}

const ScreenTitleView = ({ mainTitle }: ScreenTitleViewProps) => {
  return (
    <div>
      <h1 className={styles.title}>{mainTitle}</h1>
    </div>
  );
};

export default ScreenTitleView;
