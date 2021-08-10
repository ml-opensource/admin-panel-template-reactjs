/**
 * Types are specific for regres login =>
 */

export type TokenDef = {
  /* login system is for demo use (regres.in) */
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
  tokenType?: string;
};

/**
 * For Demo - regres - api, only token is returned from api,
 * but expiresIn is added in code
 */
export type ApiResponseDef = {
  token: string;
  expiresIn?: string;
};

export type LoginRequestDef = {
  email: string;
  password: string;
};

export type UserDef = {
  email: string;
  name: string;
  avatar: string;
};
