import moment from "moment";
import cookie from "react-cookies";

import { AUTH_ACCESS_TOKEN } from "../constants/auth.keys";
import { CookieTokenDef } from "../types/auth.types";

/**
 * Loads token from session cookie
 */
export const getTokens = () => {
  const value: CookieTokenDef = cookie.load(AUTH_ACCESS_TOKEN);

  return {
    accessToken: value?.accessToken,
    isTokenExpired: moment().isAfter(value?.expiresAt),
    tokenType: value?.tokenType,
  };
};
