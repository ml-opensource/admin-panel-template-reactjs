import React, { memo } from "react";

import { Form, FormProps, Row, Col } from "antd";

import FilterItem from "./components/FilterItem/FilterItem";

interface PageFilterProps extends FormProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  onFieldChange?: boolean;
  onSubmit?: boolean;
}

const PageFilter = ({ children, columns = 4, ...rest }: PageFilterProps) => {
  return (
    <Form
      {...rest}
      onChange={() => console.log("On change")}
      onFieldsChange={() => console.log("Fields changed")}
      onValuesChange={() => console.log("Values changed")}
    >
      <Row>
        {React.Children.map(children, child => (
          <Col xs={24} sm={12} lg={24 / columns}>
            {child}
          </Col>
        ))}
      </Row>
    </Form>
  );
};

export default memo(PageFilter);
export { FilterItem };
