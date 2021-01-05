import React, { FC, memo } from "react";

import { Layout } from "antd";

const { Content } = Layout;

const DefaultLayout: FC = memo(({ children }) => {
  return (
    <Layout>
      <Content>{children}</Content>
    </Layout>
  );
});

export default DefaultLayout;
