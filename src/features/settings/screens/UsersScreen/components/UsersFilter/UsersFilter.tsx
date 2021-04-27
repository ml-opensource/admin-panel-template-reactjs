import { memo } from "react";

import { Select, Checkbox, DatePicker } from "antd";
import moment from "moment";

import PageFilter, {
  FilterItem,
  FilterItemCheckbox,
} from "@app/components/molecules/PageFilter/PageFilter";

const { Option } = Select;
const { RangePicker } = DatePicker;

export interface UsersFilterProps {
  dates?: [moment.Moment, moment.Moment];
  name?: string;
  hasEmail?: boolean;
}

const UsersFilter = () => {
  return (
    <PageFilter<UsersFilterProps> hasReset hasSubmit parseDates>
      <FilterItem label="Dates" name="dates">
        <RangePicker />
      </FilterItem>
      <FilterItem label="Name" name="name">
        <Select placeholder="Select name" allowClear>
          <Option value="John">John</Option>
          <Option value="Jane">Jane</Option>
        </Select>
      </FilterItem>
      <FilterItemCheckbox noLabel name="hasEmail">
        <Checkbox>Has e-mail</Checkbox>
      </FilterItemCheckbox>
    </PageFilter>
  );
};

export default memo(UsersFilter);
