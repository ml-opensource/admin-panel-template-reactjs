import { Spin } from "antd";

import styles from "./SpinWrapper.module.scss";

interface SpinWrapperProps {
  children: React.ReactNode;
  loading?: boolean;
}

const SpinWrapper = ({ children, loading = false }: SpinWrapperProps) => {
  return (
    <Spin wrapperClassName={styles.wrapper} spinning={loading}>
      {children}
    </Spin>
  );
};

export default SpinWrapper;
