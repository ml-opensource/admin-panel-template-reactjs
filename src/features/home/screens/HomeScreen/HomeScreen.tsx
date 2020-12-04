import React, { FC, memo } from "react";
import TableView from "components/TableView/TableView";

const HomeScreen: FC = () => {
  return (
    <div>
      <h1>Home Screen</h1>
      <TableView />
    </div>
  );
};

export default memo(HomeScreen);
