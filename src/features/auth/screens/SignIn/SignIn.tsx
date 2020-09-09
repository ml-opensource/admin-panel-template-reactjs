import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "store/store";
import { AxiosResponse } from "axios";
import authApis from "features/auth/api.auth";

const SignIn: FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const signIn = async (): Promise<void | AxiosResponse> => {
    dispatch.auth.signInRequest();
    try {
      const res = await authApis.signIn({
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      });
      dispatch.auth.signInSuccess(res.data);
    } catch (error) {
      dispatch.auth.signInError(error.response.data);
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

export default SignIn;
