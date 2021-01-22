import { Spin, Typography } from "antd";
import cx from "classnames";

import styles from "./LoadingSpinner.module.scss";

const { Title } = Typography;

interface LoadingSpinnerProps {
  text?: string;
  isFullscreen?: boolean;
}

const LoadingSpinner = ({ text, isFullscreen }: LoadingSpinnerProps) => {
  return (
    <div
      className={cx(styles.container, {
        [styles.isFullscreen]: isFullscreen,
      })}
    >
      {!!text && <Title level={3}>{text}</Title>}

      <Spin />
    </div>
  );
};

export default LoadingSpinner;
