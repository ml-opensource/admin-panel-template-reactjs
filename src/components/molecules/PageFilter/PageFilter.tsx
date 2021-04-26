/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useCallback, useEffect, useState } from "react";

import { Form, FormProps, Row, Col, Button } from "antd";
import _mapValues from "lodash/mapValues";
import { useTranslation } from "react-i18next";

import useSearchParams from "@app/hooks/useSearchParams";

import FilterItem, {
  FilterItemCheckbox,
} from "./components/FilterItem/FilterItem";
import { parseFilters } from "./helpers/pagefilter.helpers";
import { ParseFiltersProps } from "./types/pagefilter.types";

interface PageFilterProps<T = {}> extends FormProps, ParseFiltersProps<T> {
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
  /**
   * Function to call when all filters have been reset by a reset button.
   */
  onReset?: () => void;
  /**
   * Function to call once filters have been submitted. This of
   * course depends on whether or not you have a submit / apply
   * button, or triggering the submit on filter change.
   */
  onSubmit?: () => void;
  /**
   * If true, it triggers a reset of all filters, and the the onReset()
   * function is called afterwards.
   */
  reset?: boolean;
  /**
   * Text for the reset button. Falls back to the default reset translation.
   */
  resetText?: string;
  /**
   * If true, it triggers a submit of all filters, and then the onSubmit()
   * function is called afterwards.
   */
  submit?: boolean;
  /**
   * Text for the submit / apply button. Falls back to the default apply translation.
   */
  submitText?: string;
}

const PageFilter = <T extends {}>({
  children,
  columns = 4,
  hasReset,
  hasSubmit,
  onReset,
  onSubmit,
  parseArrayDates,
  parseArrayNumbers,
  parseBoolean = true,
  parseDates,
  parseNumbers,
  reset,
  resetText,
  submit,
  submitText,
  ...rest
}: PageFilterProps<T>) => {
  const { t } = useTranslation();
  const { search, updateSearchParams } = useSearchParams();

  const [filterForm] = Form.useForm();
  const form = rest.form ?? filterForm; // If a form instance is passed in, use that instead.

  const parseSearch = useCallback(
    () =>
      parseFilters<T>({
        filters: search,
        parseArrayDates,
        parseArrayNumbers,
        parseBoolean,
        parseDates,
        parseNumbers,
      }),
    [
      parseArrayDates,
      parseArrayNumbers,
      parseBoolean,
      parseDates,
      parseNumbers,
      search,
    ]
  );

  const [data, setData] = useState(
    parseBoolean || parseNumbers ? parseSearch() : search
  );
  useEffect(() => {
    if (parseBoolean || parseNumbers) {
      setData(parseSearch());
    }
  }, [parseBoolean, parseNumbers, parseSearch, search]);

  // Submit filters, update search params.
  const handleSubmit = (values: Record<string, unknown>) => {
    updateSearchParams({ ...values });
    onSubmit?.();
  };

  // Submit on field change.
  const handleChange = (
    changedValues: Record<string, unknown>,
    allValues: Record<string, unknown>
  ) => {
    handleSubmit({ ...allValues });
  };

  // Reset filters, and clear search params.
  const handleReset = () => {
    const resetFields = _mapValues(form.getFieldsValue(), () => undefined);
    updateSearchParams({ page: undefined, ...resetFields });
    onReset?.();
  };

  // Submit triggered from outside of the component.
  useEffect(() => {
    submit && form.submit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit]);

  // Reset triggered from outside of the component.
  useEffect(() => {
    reset && handleReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  return (
    <Form
      {...rest}
      form={form}
      initialValues={data}
      onValuesChange={!hasSubmit ? handleChange : undefined}
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

export default memo(PageFilter) as typeof PageFilter;
export { FilterItem, FilterItemCheckbox };
