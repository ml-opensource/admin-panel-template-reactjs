import { memo } from "react";

import { Select, Checkbox, DatePicker } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";

import DebouncedInput from "@app/components/atoms/DebouncedInput/DebouncedInput";
import PageFilter, {
  FilterItem,
  FilterItemCheckbox,
} from "@app/components/molecules/PageFilter/PageFilter";
import { useAppSelector } from "@app/redux/store";

const { Option } = Select;
const { RangePicker } = DatePicker;

export interface UsersFilterProps {
  dates?: [moment.Moment, moment.Moment];
  name?: string;
  hasEmail?: boolean;
}

const UsersFilter = () => {
  const { t } = useTranslation();
  const { users, loading } = useAppSelector(state => ({
    users: state.users.users,
    loading: state.users.loading,
  }));

  return (
    <PageFilter<UsersFilterProps>
      showSubmitButton
      showResetButton
      parseDates
      parseNumbers={["name"]}
    >
      <FilterItem label={t("settingsUsers.filterSearchLabel")} name="search">
        {/* Remove `showSubmitButton` to see the difference */}
        <DebouncedInput wait={500} />
      </FilterItem>
      <FilterItem label={t("settingsUsers.filterDatesLabel")} name="dates">
        <RangePicker />
      </FilterItem>
      <FilterItem label={t("settingsUsers.filterNameLabel")} name="name">
        <Select
          placeholder={t("settingsUsers.filterNamePlaceholder")}
          allowClear
          loading={loading}
        >
          {users.map(user => (
            <Option key={user.id} value={user.id}>
              {user.firstName}
            </Option>
          ))}
        </Select>
      </FilterItem>
      <FilterItemCheckbox noLabel name="hasEmail">
        <Checkbox>{t("settingsUsers.filterHasEmailLabel")}</Checkbox>
      </FilterItemCheckbox>
    </PageFilter>
  );
};

export default memo(UsersFilter);
