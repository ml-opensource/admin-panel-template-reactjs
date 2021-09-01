import { memo, ReactNode } from "react";

import { Layout } from "antd";

const { Content } = Layout;
type BlankLayoutProps = {
  children: ReactNode;
};

const BlankLayout = memo(({ children }: BlankLayoutProps) => {
  return (
    <Layout>
      <Content>{children}</Content>
    </Layout>
  );
});

export default BlankLayout;
