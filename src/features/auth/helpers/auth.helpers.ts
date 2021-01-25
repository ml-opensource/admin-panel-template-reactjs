import { isAfter } from "date-fns";
import cookie from "react-cookies";

import { AUTH_ACCESS_TOKEN } from "../constants/auth.keys";

/**
 * Loads token from session cookie
 */
export const getTokens = () => {
  const value = cookie.load(AUTH_ACCESS_TOKEN);

  const current = new Date();
  const expiry = new Date(value?.expiresAt);

  return {
    accessToken: value?.accessToken,
    isTokenExpired: isAfter(current, expiry),
    tokenType: value?.tokenType,
  };
};
