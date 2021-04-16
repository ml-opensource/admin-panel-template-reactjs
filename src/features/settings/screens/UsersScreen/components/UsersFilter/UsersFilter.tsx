import { memo } from "react";

import { Input, Select } from "antd";

import PageFilter, {
  FilterItem,
} from "@app/components/molecules/PageFilter/PageFilter";

const { Option } = Select;

const UsersFilter = () => {
  return (
    <PageFilter>
      <FilterItem label="Test 1" name="test1">
        <Input placeholder="Test 1" />
      </FilterItem>
      <FilterItem label="Test 2" name="test2">
        <Select placeholder="Test 2">
          <Option value="john">John</Option>
          <Option value="jane">Jane</Option>
        </Select>
      </FilterItem>
      <FilterItem>Test 3</FilterItem>
      <FilterItem>Test 4</FilterItem>
      <FilterItem>Test 5</FilterItem>
    </PageFilter>
  );
};

export default memo(UsersFilter);
