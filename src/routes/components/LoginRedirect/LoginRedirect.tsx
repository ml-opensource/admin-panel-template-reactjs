import qs from "query-string";
import { Redirect, useLocation } from "react-router-dom";

import { AuthPathsEnum } from "@app/features/auth/auth";

const LoginRedirect = () => {
  const location = useLocation();

  return (
    <Redirect
      to={{
        pathname: AuthPathsEnum.LOGIN,
        search: qs.stringify({ redirect: location.pathname }),
      }}
    />
  );
};

export default LoginRedirect;
