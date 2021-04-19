import { memo } from "react";

import { Input, Select, Checkbox, Button } from "antd";

import PageFilter, {
  FilterItem,
} from "@app/components/molecules/PageFilter/PageFilter";

const { Option } = Select;

const UsersFilter = () => {
  return (
    <PageFilter onSubmit>
      <FilterItem label="Test 1" name="test1">
        <Input placeholder="Test 1" />
      </FilterItem>
      <FilterItem label="Test 2" name="test2">
        <Select placeholder="Test 2">
          <Option value="john">John</Option>
          <Option value="jane">Jane</Option>
        </Select>
      </FilterItem>
      <FilterItem label="Test3" name="test3">
        <Checkbox>Test 3</Checkbox>
      </FilterItem>
      <FilterItem>Test 4</FilterItem>
      <FilterItem>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FilterItem>
    </PageFilter>
  );
};

export default memo(UsersFilter);
