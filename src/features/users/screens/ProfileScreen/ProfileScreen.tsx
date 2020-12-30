import React, { FC, memo } from "react";

import { useSelector } from "react-redux";

import { RootState } from "store/store";

import UpdateProfileForm from "./UpdateProfileForm/UpdateProfileForm";

const ProfileScreen: FC = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div>
      <h1>Current user</h1>

      {user.info && (
        <div>
          Name: {user.info.name}
          <br />
          Color: {user.info.color}
          <br />
          Pantone: {user.info.pantone_value}
          <br />
          Year: {user.info.year}
          <br />
        </div>
      )}
      <UpdateProfileForm />
    </div>
  );
};

export default memo(ProfileScreen);
