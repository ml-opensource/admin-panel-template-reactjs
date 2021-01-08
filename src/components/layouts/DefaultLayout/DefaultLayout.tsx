import { ReactNode } from "react";

import { Layout } from "antd";

import Navigation from "@app/components/molecules/Navigation/Navigation";

import styles from "./DefaultLayout.module.scss";

const { Content } = Layout;

type DefaultLayoutProps = {
  children: ReactNode;
};

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <Layout>
      <Navigation sticky />
      <Content className={styles.container}>
        <div className={styles.content}>{children}</div>
      </Content>
    </Layout>
  );
};

export default DefaultLayout;
