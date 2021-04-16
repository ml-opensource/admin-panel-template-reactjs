import { memo } from "react";

import { Input } from "antd";

import PageFilter, {
  FilterItem,
} from "@app/components/molecules/PageFilter/PageFilter";

const UsersFilter = () => {
  return (
    <PageFilter>
      <FilterItem label="Test 1">
        <Input placeholder="Test 1" />
      </FilterItem>
      <FilterItem>Test 2</FilterItem>
      <FilterItem>Test 3</FilterItem>
      <FilterItem>Test 4</FilterItem>
      <FilterItem>Test 5</FilterItem>
    </PageFilter>
  );
};

export default memo(UsersFilter);
