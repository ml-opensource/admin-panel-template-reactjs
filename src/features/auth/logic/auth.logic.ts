import {
  TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  FULL_NAME_KEY,
  PICTURE_KEY,
  EMAIL_KEY,
} from "../constants/auth.keys";
import { LoginResponseDataDef } from "../types/auth.responseDataDef";

export const setUserInfo = (data: LoginResponseDataDef) => {
  // TODO: move to redux
  sessionStorage.setItem(FULL_NAME_KEY, data.fullName);
  sessionStorage.setItem(EMAIL_KEY, data.email);
  sessionStorage.setItem(PICTURE_KEY, data.picture);
};

export const getUserInfo = () => {
  // TODO: move to redux
  const email = sessionStorage.getItem(EMAIL_KEY);
  const fullName = sessionStorage.getItem(FULL_NAME_KEY);
  const picture = sessionStorage.getItem(PICTURE_KEY);

  return { email, fullName, picture };
};

export const setAuthentication = (data: LoginResponseDataDef) => {
  // TODO: move to redux
  sessionStorage.setItem(TOKEN_KEY, data.token);
  sessionStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
  setUserInfo(data);
};

export const isAuthenticated = () => {
  // TODO: move to redux
  const accessToken = sessionStorage.getItem(TOKEN_KEY);
  if (accessToken !== null) return true;
  return false;
};

export const logOut = () => {
  // TODO: move to redux
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(FULL_NAME_KEY);
  sessionStorage.removeItem(EMAIL_KEY);
  sessionStorage.removeItem(PICTURE_KEY);
};
