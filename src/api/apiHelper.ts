import axios from "axios";
import { store } from "store/store";

const apiHelper = axios.create({
  baseURL: process.env.REACT_APP_HOST,
  headers: { "Content-Type": "application/json" },
});

apiHelper.interceptors.request.use(config => {
  const requestConfig = config;

  const { auth } = store.getState();
  const token = auth.accessToken;

  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  } else {
    requestConfig.headers.Authorization = null;
  }

  return requestConfig;
});

apiHelper.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      // Handle error here
    }
    return Promise.reject(error);
  }
);

export default apiHelper;
