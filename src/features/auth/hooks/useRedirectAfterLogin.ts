import { useEffect } from "react";

import qs from "query-string";
import { useHistory, useLocation } from "react-router-dom";

import { useAppSelector } from "@app/redux/store";
import { RedirectDef } from "@app/types/route.types";

function useRedirectAfterLogin() {
  const history = useHistory();
  const location = useLocation<RedirectDef>();
  const { redirect } = qs.parse(location.search);
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      history.push((redirect as string) ?? "/");
    }
  }, [redirect, history, isAuthenticated]);
  return null;
}

export default useRedirectAfterLogin;
