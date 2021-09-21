import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import moment from "moment";

import { ENV } from "@app/constants/env";
import { AuthEndpointsEnum, getTokens } from "@app/features/auth/auth";
import { toCamel, toSnakeCase } from "@app/helpers/object-convert.helper";

/**
 * All the endpoint that do not require an access token
 */
const anonymousEndpoints = [AuthEndpointsEnum.LOGIN.toString()];

/**
 * "Wrapper" around getTokens
 * can be changed to have refresh functionality if api supports it
 */
export const getRefreshedToken = () => {
  const { accessToken, expiresAt } = getTokens();

  const isTokenExpired = moment().isSameOrAfter(expiresAt);

  return { accessToken, isTokenExpired };
};

/**
 * Adds authorization headers to API calls
 * @param {AxiosRequestConfig} request
 */
const authInterceptor = async (request: AxiosRequestConfig) => {
  request.params = toSnakeCase(request.params, true);
  request.data = toSnakeCase(request.data, true);

  const isAnonymous = anonymousEndpoints.some(endpoint =>
    request.url?.startsWith(endpoint)
  );

  const { accessToken } = getRefreshedToken();

  if (accessToken) {
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

/**
 * Axios response interceptors
 * @param {AxiosResponse} response
 */
const responseInterceptor = (response: AxiosResponse) => {
  response.data = toCamel(response.data);
  return response;
};

/**
 * Axios error interceptor
 * @param {AxiosError} axiosError
 */
const errorInterceptor = (axiosError: AxiosError) => {
  return axiosError;
};

/** Setup an API instance */
export const api = axios.create({
  baseURL: ENV.API_HOST,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(authInterceptor);
api.interceptors.response.use(responseInterceptor, errorInterceptor);
