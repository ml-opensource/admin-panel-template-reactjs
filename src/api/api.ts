import axios, { AxiosRequestConfig } from "axios";
import moment from "moment";

import { ENV } from "@app/constants/env";
import { AuthEndpointsEnum, getTokens } from "@app/features/auth/auth";

const isRefreshing = false;

/**
 * All the endpoint that do not require an access token
 */
const anonymousEndpoints = [AuthEndpointsEnum.LOGIN.toString()];

/**
 * "Wrapper" around getTokens
 * can be changed to have refresh functionality if api supports it
 * the outcommented code in the function is taken from OpenApi (Heroes of Work project)
 */
export const getRefreshedToken = () => {
  const { accessToken, expiresAt } = getTokens();

  const isTokenExpired = moment().isSameOrAfter(expiresAt);

  /**
   * Refresh token
   */
  if (isTokenExpired && !isRefreshing) {
    // isRefreshing = true;
    // authApi
    //   .refreshAccessToken()
    //   .then(response => {
    //     if (response.data?.token) {
    //       saveTokens(response.data.token);
    //       isRefreshing = false;
    //       onAccessTokenFetched(response.data.token.accessToken);
    //       subscribers = [];
    //     }
    //   })
    //   .catch(() => {
    //     clearTokens();
    //     store.dispatch(clearUser());
    //   });
  }

  return { accessToken, isTokenExpired };
};

/**
 * Adds authorization headers to API calls
 * @param {AxiosRequestConfig} request
 */
const authInterceptor = async (request: AxiosRequestConfig) => {
  const isAnonymous = anonymousEndpoints.some(endpoint =>
    request.url?.startsWith(endpoint)
  );

  // can be included from getRefreshedToken: isTokenExpired
  const { accessToken } = getRefreshedToken();

  /**
   *  use for refreshing from api =>
   */

  //  const isRefreshTokenRequest =
  //  request.url === AuthEndpointsEnum.REFRESH_TOKEN.toString();

  //  if (isTokenExpired && !isRefreshTokenRequest) {
  //    const retryOriginalRequest = new Promise(resolve => {
  //      addSubscriber(token => {
  //        request.headers.Authorization = `${tokenType} ${token}`;
  //        resolve(request);
  //       });
  //     });
  //     return retryOriginalRequest as AxiosRequestConfig;
  //   }

  if (accessToken) {
    // If there's a tokenType required:
    // request.headers.Authorization = `${tokenType} ${accessToken}`;
    request.headers.Authorization = `${accessToken}`;
    return request;
  }

  if (!accessToken && !isAnonymous) {
    // TODO: handle when UNAUTHORIZED;
    // return Promise.reject(ApiStatusCodes.UNAUTHORIZED);
    return request;
  }

  return request;
};

/** Setup an API instance */
export const api = axios.create({
  baseURL: ENV.API_HOST,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(authInterceptor);
