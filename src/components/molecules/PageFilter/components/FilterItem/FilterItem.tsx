import { memo } from "react";

import { Form, FormItemProps } from "antd";

const { Item } = Form;

interface FilterItemProps extends FormItemProps {
  /**
   * When in vertical layout, with labels over fields, there are
   * scenarios where you don't necessarily want a label, for example
   * a checkbox with its own inline label. When not passing a label,
   * it would render the checkbox inline with the labels of other
   * fields. Therefore in order to "force" the field, the checkbox
   * in this scenario, we can pass it a label with a whitespace.
   */
  noLabel?: boolean;
}

const FilterItem = ({ children, noLabel, ...rest }: FilterItemProps) => (
  <Item
    labelCol={{ span: 24 }}
    wrapperCol={{ span: 24 }}
    label={noLabel && "\u00A0"} // To ensure layout consistency between fields, if no label is passed
    {...rest}
  >
    {children}
  </Item>
);

/**
 * In order to avoid having to write out valuePropName="checked" again
 * and again, when you have a filter setup with many checkboxes, importing
 * the FilterItemCheckbox variant can improve maintainability.
 */
const FilterItemCheckbox = (props: FilterItemProps) => (
  <FilterItem valuePropName="checked" {...props} />
);

export default memo(FilterItem);
export { FilterItemCheckbox };
