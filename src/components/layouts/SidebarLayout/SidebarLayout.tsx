import { ReactNode } from "react";

import { Layout } from "antd";

import Navigation from "@app/components/molecules/Navigation/Navigation";

import styles from "./SidebarLayout.module.scss";

const { Content } = Layout;

type SidebarLayoutProps = {
  children: ReactNode;
};

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  return (
    <Layout>
      <Navigation sidebar />
      <Content className={styles.container}>
        <div className={styles.content}>{children}</div>
      </Content>
    </Layout>
  );
};

export default SidebarLayout;
