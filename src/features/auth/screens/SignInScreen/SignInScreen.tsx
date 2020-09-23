import React, { FC, memo } from "react";
import { AxiosResponse } from "axios";
import { authApi } from "../../api/auth.api";

const SignInScreen: FC = () => {
  const signIn = async (): Promise<void | AxiosResponse> => {
    try {
      const res = await authApi.signIn({
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      });
      if (res.status === 200) {
        // let's direct
      }
    } catch (error) {
      // something went wrong
    }
  };

  return (
    <div>
      <h1>SignIn Screen</h1>
      <button type="button" onClick={signIn}>
        Sign in
      </button>
    </div>
  );
};

export default memo(SignInScreen);
