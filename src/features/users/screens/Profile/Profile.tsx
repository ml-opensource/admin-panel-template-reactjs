import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch, iRootState } from "store/store";
import { UserDef } from "features/users/types/user";
import userApis from "features/users/api.user";
import { AxiosResponse } from "axios";

const Profile: FC = () => {
  const user = useSelector((state: iRootState) => state.user);
  const userData: UserDef = user.fetchUser.data;
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    const fetchUserRequest = async (): Promise<void | AxiosResponse> => {
      dispatch.user.fetchUserRequest();
      try {
        const res = await userApis.detail("1");
        dispatch.user.fetchUserSuccess(res.data);
      } catch (error) {
        dispatch.user.fetchUserError(error.response.data);
      }
    };

    fetchUserRequest();
  }, [dispatch.user]);

  return (
    <div>
      <h1>Profile Screen</h1>

      {userData.id && (
        <div>
          Name: {userData.first_name} {userData.last_name}
          <br />
          Email: {userData.email}
          <br />
          <img src={userData.avatar} alt="avatar" />
        </div>
      )}
    </div>
  );
};

export default Profile;
