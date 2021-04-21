import React, { memo } from "react";

import { Form, FormProps, Row, Col, Button } from "antd";

import useSearchParams from "@app/hooks/useSearchParams";

import FilterItem, {
  FilterItemCheckbox,
} from "./components/FilterItem/FilterItem";

interface PageFilterProps extends FormProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  hasSubmit?: boolean;
  onApply?: () => void;
}

const PageFilter = ({
  children,
  columns = 4,
  hasSubmit,
  onApply,
  ...rest
}: PageFilterProps) => {
  const { search, updateSearchParams } = useSearchParams();

  const handleSubmit = (values: Record<string, unknown>) => {
    updateSearchParams({ ...values });
    onApply?.();
  };

  const handleSelect = (
    changedValues: Record<string, unknown>,
    allValues: Record<string, unknown>
  ) => {
    handleSubmit({ ...allValues });
  };

  return (
    <Form
      {...rest}
      initialValues={search}
      onValuesChange={!hasSubmit ? handleSelect : undefined}
      onFinish={handleSubmit}
    >
      <Row>
        {React.Children.map(children, child => (
          <Col xs={24} sm={12} lg={24 / columns}>
            {child}
          </Col>
        ))}
        {hasSubmit && (
          <Form.Item>
            <Col xs={24} sm={12} lg={24 / columns}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Col>
          </Form.Item>
        )}
      </Row>
    </Form>
  );
};

export default memo(PageFilter);
export { FilterItem, FilterItemCheckbox };
