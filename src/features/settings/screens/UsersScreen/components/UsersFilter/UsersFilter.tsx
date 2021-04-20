import { memo } from "react";

import { Input, Select, Checkbox, Button } from "antd";

import PageFilter, {
  FilterItem,
} from "@app/components/molecules/PageFilter/PageFilter";

const { Option } = Select;

export type UsersFilterDef = {
  test1?: string;
  test2?: string;
  test3?: boolean;
  test4?: string[];
};

const UsersFilter = () => {
  return (
    <PageFilter onSubmit>
      <FilterItem label="Test 1" name="test1">
        <Input placeholder="Test 1" />
      </FilterItem>
      <FilterItem label="Test 2" name="test2">
        <Select placeholder="Test 2">
          <Option value="1">John</Option>
          <Option value="2">Jane</Option>
        </Select>
      </FilterItem>
      <FilterItem label="Test3" name="test3" valuePropName="checked">
        <Checkbox>Test 3</Checkbox>
      </FilterItem>
      <FilterItem label="Test 4" name="test4">
        <Select placeholder="Test 4" mode="multiple">
          <Option value="1">John</Option>
          <Option value="2">Jane</Option>
        </Select>
      </FilterItem>
      <FilterItem>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FilterItem>
    </PageFilter>
  );
};

export default memo(UsersFilter);
