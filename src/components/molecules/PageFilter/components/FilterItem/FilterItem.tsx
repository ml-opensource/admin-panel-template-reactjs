import { memo } from "react";

import { Form, FormItemProps } from "antd";

const { Item } = Form;

const FilterItem = ({ children, ...rest }: FormItemProps) => {
  return (
    <Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} {...rest}>
      {children}
    </Item>
  );
};

export default memo(FilterItem);
