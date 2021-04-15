import { memo } from "react";

import PageFilter from "@app/components/molecules/PageFilter/PageFilter";

const UsersFilter = () => {
  return (
    <PageFilter>
      <p>Test 1</p>
      <p>Test 2</p>
      <p>Test 3</p>
      <p>Test 4</p>
      <p>Test 5</p>
    </PageFilter>
  );
};

export default memo(UsersFilter);
