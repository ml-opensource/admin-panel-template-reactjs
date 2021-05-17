/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useCallback, useEffect } from "react";

import { Form, FormProps, Row, Col, Button } from "antd";
import _mapValues from "lodash/mapValues";
import { useTranslation } from "react-i18next";

import useSearchParams from "@app/hooks/useSearchParams";

import FilterItem, {
  FilterItemCheckbox,
} from "./components/FilterItem/FilterItem";
import { parseFilters } from "./helpers/page-filter.helpers";
import { ParseFiltersProps } from "./types/page-filter.types";

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
  showResetButton?: boolean;
  /**
   * Outputs a submit / apply button, which means that the
   * filters will no longer trigger on change, but rather on
   * submit.
   */
  showSubmitButton?: boolean;
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
   * Text for the reset button. Falls back to the default reset translation.
   */
  resetText?: string;
  /**
   * Text for the submit / apply button. Falls back to the default apply translation.
   */
  submitText?: string;
}

const PageFilter = <T extends {}>({
  children,
  columns = 4,
  showResetButton,
  showSubmitButton,
  onReset,
  onSubmit,
  parseDates,
  parseNumbers,
  resetText,
  submitText,
  ...rest
}: PageFilterProps<T>) => {
  const { t } = useTranslation();
  const { search, updateSearchParams } = useSearchParams();

  const [form] = Form.useForm(rest.form);

  const getSearch = useCallback(
    () =>
      parseDates || parseNumbers
        ? parseFilters<T>({
            filters: search,
            parseDates,
            parseNumbers,
          })
        : search,
    [parseDates, parseNumbers, search]
  );

  // Every time the search is updated
  // then we reset the fields and parse in the search values
  // this will update the form values when going back
  // and forth in the navigation history
  useEffect(() => {
    const resetFields = _mapValues(form.getFieldsValue(), () => undefined);
    form.setFieldsValue({ ...resetFields, ...getSearch() });
  }, [form, getSearch]);

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

  return (
    <Form
      {...rest}
      form={form}
      onValuesChange={!showSubmitButton ? handleChange : undefined}
      onFinish={handleSubmit}
    >
      <Row gutter={24}>
        {React.Children.map(children, child => (
          <Col xs={24} sm={columns > 1 ? 12 : 24} lg={24 / columns}>
            {child}
          </Col>
        ))}
      </Row>
      {(showResetButton || showSubmitButton) && (
        <Row gutter={24}>
          {showResetButton && (
            <Col>
              <Form.Item>
                <Button htmlType="reset" onClick={handleReset}>
                  {resetText ?? t("default.reset")}
                </Button>
              </Form.Item>
            </Col>
          )}
          {showSubmitButton && (
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
