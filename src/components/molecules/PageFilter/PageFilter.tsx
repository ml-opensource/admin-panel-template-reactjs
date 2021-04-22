import React, { memo, useCallback, useEffect, useState } from "react";

import { Form, FormProps, Row, Col, Button } from "antd";
import _mapValues from "lodash/mapValues";
import { useTranslation } from "react-i18next";

import useSearchParams from "@app/hooks/useSearchParams";

import FilterItem, {
  FilterItemCheckbox,
} from "./components/FilterItem/FilterItem";

interface PageFilterProps extends FormProps {
  /**
   * Each child should be wrapped in a FilterItem,
   * or FilterItemCheckbox, component in order for
   * the filter to pick up on changes to a given
   * field.
   */
  children: React.ReactNode;
  /**
   * The amount of columns to use on desktop, or from
   * the "lg" breakpoint. Alternatively if you need your
   * filters to be layed out in a vertical manner, you
   * can simply set columns to 1;
   */
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Outputs a reset button that resets the filters.
   */
  hasReset?: boolean;
  /**
   * Outputs a submit / apply button, which means that the
   * filters will no longer trigger on change, but rather on
   * submit.
   */
  hasSubmit?: boolean;
  onApply?: () => void;
  /**
   * Runs through arrays in the query string, and parses string
   * that contain numbers. Useful if you have a multi select, with
   * numbers for values.
   */
  parseArrayNumbers?: boolean;
  /**
   * Runs through the query string and parses string with boolean
   * values. Useful for checkboxes.
   */
  parseBoolean?: boolean;
  /**
   * Runs throught the query string and parses strings with numbers.
   * Useful for fields that contain numbers for values, such as a select.
   */
  parseNumbers?: boolean;
  /**
   * Text for the reset button. Falls back to the default reset translation.
   */
  resetText?: string;
  /**
   * Text for the submit / apply button. Falls back to the default apply translation.
   */
  submitText?: string;
}

const PageFilter = ({
  children,
  columns = 4,
  hasReset,
  hasSubmit,
  onApply,
  parseArrayNumbers,
  parseBoolean = true,
  parseNumbers,
  resetText,
  submitText,
  ...rest
}: PageFilterProps) => {
  const { t } = useTranslation();
  const { search, updateSearchParams } = useSearchParams();

  const [filterForm] = Form.useForm();
  const form = rest.form ?? filterForm;

  const parseSearch = useCallback(() => {
    const parsedSearch: Record<string, unknown> = {};

    Object.entries(search).forEach(([key, value]) => {
      if (parseBoolean && (value === "false" || value === "true")) {
        parsedSearch[key] = JSON.parse(value);
      } else if (
        parseNumbers &&
        typeof value === "string" &&
        !Number.isNaN(Number(value))
      ) {
        parsedSearch[key] = Number(value);
      } else if (parseArrayNumbers && Array.isArray(value)) {
        parsedSearch[key] = value.map(item => {
          if (typeof item === "string" && !Number.isNaN(Number(item))) {
            return Number(item);
          }
          return item;
        });
      } else {
        parsedSearch[key] = value;
      }
    });

    return parsedSearch;
  }, [parseArrayNumbers, parseBoolean, parseNumbers, search]);

  const [data, setData] = useState(
    parseBoolean || parseNumbers ? parseSearch() : search
  );
  useEffect(() => {
    if (parseBoolean || parseNumbers) {
      setData(parseSearch());
    }
  }, [parseBoolean, parseNumbers, parseSearch, search]);

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

  const handleReset = () => {
    const resetFields = _mapValues(form.getFieldsValue(), () => undefined);
    updateSearchParams({ page: undefined, ...resetFields });
  };

  return (
    <Form
      {...rest}
      form={form}
      initialValues={data}
      onValuesChange={!hasSubmit ? handleSelect : undefined}
      onFinish={handleSubmit}
    >
      <Row gutter={24}>
        {React.Children.map(children, child => (
          <Col xs={24} sm={columns > 1 ? 12 : 24} lg={24 / columns}>
            {child}
          </Col>
        ))}
      </Row>
      {(hasReset || hasSubmit) && (
        <Row gutter={24}>
          {hasReset && (
            <Col>
              <Form.Item>
                <Button htmlType="reset" onClick={handleReset}>
                  {resetText ?? t("default.reset")}
                </Button>
              </Form.Item>
            </Col>
          )}
          {hasSubmit && (
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {submitText ?? t("default.apply")}
                </Button>
              </Form.Item>
            </Col>
          )}
        </Row>
      )}
    </Form>
  );
};

export default memo(PageFilter);
export { FilterItem, FilterItemCheckbox };
