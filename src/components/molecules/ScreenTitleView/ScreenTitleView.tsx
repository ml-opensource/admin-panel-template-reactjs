import { memo } from "react";

import { PageHeader } from "antd";
import { PageHeaderProps } from "antd/lib/page-header";

const ScreenTitleView = memo(({ ...props }: PageHeaderProps) => {
  return <PageHeader {...props} />;
});

export default ScreenTitleView;
