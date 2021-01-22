import { ReactNode } from "react";

import { Layout } from "antd";

import Navigation from "@app/components/molecules/Navigation/Navigation";

import styles from "./HeaderLayout.module.scss";

const { Content } = Layout;

type HeaderLayoutProps = {
  children: ReactNode;
};

const HeaderLayout = ({ children }: HeaderLayoutProps) => {
  return (
    <Layout>
      <Navigation sticky />
      <Content className={styles.container}>
        <div className={styles.content}>{children}</div>
      </Content>
    </Layout>
  );
};

export default HeaderLayout;
