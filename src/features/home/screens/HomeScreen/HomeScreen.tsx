import React, { FC, memo, useEffect, useState } from "react";
import TableView from "components/TableView/TableView";
import { userApi } from "../../api/home.api";

const HomeScreen: FC = () => {
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
      <h1>Home Screen</h1>
      {users.length && <TableView data={users} />}
    </div>
  );
};

export default memo(HomeScreen);
