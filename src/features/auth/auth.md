# Authentication setup for OpenApi

The template has a basic authentication setup, that authenticates a dummy user. To setup authentication with openApi, following steps can be necessary.

---

## In file /api/api.ts

    const isRefreshing = false;

In function getRefreshedToken()

    /**
       * Refresh token
       */
      if (isTokenExpired && !isRefreshing) {
    isRefreshing = true;
     authApi
       .refreshAccessToken()
       .then(response => {
         if (response.data?.token) {
           saveTokens(response.data.token);
           isRefreshing = false;
           onAccessTokenFetched(response.data.token.accessToken);
           subscribers = [];
         }
       })
       .catch(() => {
         clearTokens();
         store.dispatch(clearUser());
       });
      }

in function authInterceptor():

    const { accessToken, isTokenExpired } = getRefreshedToken();

    /**
        use for refreshing from api =>
    */
    const isRefreshTokenRequest = request.url === AuthEndpointsEnum.REFRESH_TOKEN.toString();

    if (isTokenExpired && !isRefreshTokenRequest) {
      const retryOriginalRequest = new Promise(resolve => {
        addSubscriber(token => {
          request.headers.Authorization = `${tokenType} ${token}`;
          resolve(request);
        });
      });
      return retryOriginalRequest as AxiosRequestConfig;
    }

---

## In file: api.constants.ts

    /**
      Approach for open api based projects:
    */
    import { Configuration } from "@app/@generated";
    import { getRefreshedToken } from "@app/features/auth/auth";

    import { ENV } from "./env";

    const apiClientConfiguration = new Configuration();

    apiClientConfiguration.basePath = ENV.API_HOST;

    apiClientConfiguration.accessToken = async () => {
      const accessToken = await getRefreshedToken();
      return accessToken ?? "";
    };

    export { apiClientConfiguration };
