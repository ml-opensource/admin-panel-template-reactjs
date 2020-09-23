import React, { FC, memo } from "react";

const ProfileScreen: FC = () => {
  const userData = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@doe.com",
    avatar: "",
  };

  return (
    <div>
      <h1>Profile Screen</h1>

      {userData.id && (
        <div>
          Name: {userData.firstName} {userData.lastName}
          <br />
          Email: {userData.email}
          <br />
          <img src={userData.avatar} alt="avatar" />
        </div>
      )}
    </div>
  );
};

export default memo(ProfileScreen);
