import axios, { AxiosRequestConfig, AxiosError } from "axios";

/**
 * Adds authorization headers to API calls
 * @param {AxiosRequestConfig} request
 */
const authInterceptor = (request: AxiosRequestConfig) => {
  const requestConfig = request;

  return requestConfig;
};

/**
 * Axios error interceptor
 * @param {AxiosError} axiosError
 */
const errorInterceptor = (axiosError: AxiosError) => {
  if (axiosError && axiosError.response) {
    // Handle error here
  }
  return Promise.reject(axiosError);
};

/** Setup an API instance */
export const api = axios.create({
  baseURL: process.env.REACT_APP_HOST,
  headers: { "Content-Type": "application/json" },
});

/** Add interceptor */
api.interceptors.request.use(authInterceptor);
api.interceptors.response.use(res => res, errorInterceptor);
