import React, { FC, memo } from "react";

import { useSelector } from "react-redux";

import { RootState } from "store/store";

import UpdateProfileForm from "./UpdateProfileForm/UpdateProfileForm";

const ProfileScreen: FC = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div>
      <h1>Profile Screen</h1>

      {user.info && (
        <div>
          Name: {user.info.firstName} {user.info.lastName}
          <br />
          Email: {user.info.email}
          <br />
          <img src={user.info.avatar} alt="avatar" />
        </div>
      )}
      <UpdateProfileForm endpoint="" />
    </div>
  );
};

export default memo(ProfileScreen);
