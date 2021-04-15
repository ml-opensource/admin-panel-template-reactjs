import { memo } from "react";

import { Form, FormProps } from "antd";

interface PageFilterProps extends FormProps {
  children: React.ReactNode;
}

const PageFilter = ({ children, ...rest }: PageFilterProps) => {
  return <Form {...rest}>{children}</Form>;
};

export default memo(PageFilter);
