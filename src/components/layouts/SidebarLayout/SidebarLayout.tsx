import { memo, ReactNode } from "react";

import { Layout } from "antd";

import Navigation from "@app/components/molecules/Navigation/Navigation";

import styles from "./SidebarLayout.module.scss";

const { Content } = Layout;

type SidebarLayoutProps = {
  children: ReactNode;
};

const SidebarLayout = memo(({ children }: SidebarLayoutProps) => {
  return (
    <Layout>
      <Navigation sidebar />
      <Layout className={styles.pushContent}>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
});

export default SidebarLayout;
