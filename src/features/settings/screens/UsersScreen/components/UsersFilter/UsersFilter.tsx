import { memo } from "react";

import { Input, Select, Checkbox, DatePicker } from "antd";
import moment from "moment";

import PageFilter, {
  FilterItem,
  FilterItemCheckbox,
} from "@app/components/molecules/PageFilter/PageFilter";

const { Option } = Select;
const { RangePicker } = DatePicker;

export interface UsersFilterProps {
  test1?: string;
  test2?: string;
  test3?: boolean;
  test4?: string[];
  dates?: [moment.Moment, moment.Moment];
}

const UsersFilter = () => {
  return (
    <PageFilter<UsersFilterProps> hasReset hasSubmit parseArrayDates>
      <FilterItem label="Test 1" name="test1">
        <Input placeholder="Test 1" />
      </FilterItem>
      <FilterItem label="Test 2" name="test2">
        <Select placeholder="Test 2" allowClear>
          <Option value="1">John</Option>
          <Option value="2">Jane</Option>
        </Select>
      </FilterItem>
      <FilterItemCheckbox noLabel name="test3">
        <Checkbox>Test 3</Checkbox>
      </FilterItemCheckbox>
      <FilterItem label="Test 4" name="test4">
        <Select placeholder="Test 4" mode="multiple">
          <Option value="1">John</Option>
          <Option value="2">Jane</Option>
        </Select>
      </FilterItem>
      <FilterItem label="Dates" name="dates">
        <RangePicker />
      </FilterItem>
    </PageFilter>
  );
};

export default memo(UsersFilter);
