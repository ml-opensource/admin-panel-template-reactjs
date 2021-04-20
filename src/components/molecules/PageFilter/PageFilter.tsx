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
  const { search, updateSearchParams } = useSearchParams();

  const handleSelect = (
    changedValues: Record<string, unknown>,
    allValues: Record<string, unknown>
  ) => {
    updateSearchParams({ ...allValues });
  };

  const handleSubmit = (values: Record<string, unknown>) => {
    updateSearchParams({ ...values });
  };

  return (
    <Form
      {...rest}
      initialValues={search}
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
