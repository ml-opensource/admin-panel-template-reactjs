import React, { memo } from "react";

import { Form, FormProps, Row, Col } from "antd";

import useSearchParams from "@app/hooks/useSearchParams";

import FilterItem from "./components/FilterItem/FilterItem";

interface PageFilterProps extends FormProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  onSubmit?: boolean;
}

const PageFilter = ({
  children,
  columns = 4,
  onSubmit,
  ...rest
}: PageFilterProps) => {
  const { updateSearchParams } = useSearchParams();

  const handleSelect = (
    changedValues: Record<string, unknown>,
    allValues: Record<string, unknown>
  ) => {
    console.log("values changed", changedValues, allValues);
    updateSearchParams({ ...allValues });
  };

  const handleSubmit = (values: Record<string, unknown>) => {
    console.log("filters submitted", values);
    updateSearchParams({ ...values });
  };

  return (
    <Form
      {...rest}
      onValuesChange={!onSubmit ? handleSelect : undefined}
      onFinish={handleSubmit}
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
