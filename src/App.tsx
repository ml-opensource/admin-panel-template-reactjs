import { lazy, Suspense, useEffect } from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { useMount } from "react-use";

import LoadingSpinner from "@app/components/atoms/LoadingSpinner/LoadingSpinner";

import { getMe, getTokens } from "./features/auth/auth";
import { useLocalization } from "./features/localization/localization";
import {
  PermissionEnum,
  setPermissions,
} from "./features/permissions/permissions";
import { useAppDispatch, useAppSelector } from "./redux/store";

// Routes are lazy loaded so they will access to correct permissions
const Routes = lazy(() => import("./routes/Routes"));

const App = () => {
  const { loadingTranslation } = useLocalization({ shouldCall: true });
  const { accessToken } = getTokens();
  const dispatch = useAppDispatch();
  const { loadingUser } = useAppSelector(state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loadingUser: state.auth.loading,
  }));

  useMount(() => {
    if (accessToken) {
      dispatch(getMe());
    }
  });

  useEffect(() => {
    dispatch(
      setPermissions(
        Object.values(PermissionEnum).filter(
          x =>
            // HACK: added here to play around with the permissions
            // permissions listed here will be removed from user's permissions
            ![PermissionEnum.USERS_DELETE].includes(x)
        )
      )
    );
  }, [dispatch]);

  const loading = <LoadingSpinner isFullscreen text="Loading Admin Panel" />;

  if (loadingUser || loadingTranslation) return loading;

  return (
    <Suspense fallback={loading}>
      <Router>
        <Routes />
      </Router>
    </Suspense>
  );
};

export default App;
