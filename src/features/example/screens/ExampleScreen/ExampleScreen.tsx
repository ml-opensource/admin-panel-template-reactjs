import React, { FC, memo, useEffect, useState } from "react";
import TableView from "components/TableView/TableView";
import { userApi } from "../../api/example.api";

const ExampleScreen: FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await userApi.list();
      const userData = response.data;

      setUsers(userData.data);
    };
    getUsers();
  }, []);

  return (
    <div>
      <h1>Example Screen</h1>
      {users.length && <TableView data={users} />}
    </div>
  );
};

export default memo(ExampleScreen);
