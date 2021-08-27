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

/**
 * For redux slice and helper function
 */
export interface InitialStateDef {
  user: UserDef | null;
  isAuthenticated: boolean;
  error: boolean;
  loading: boolean;
}

/* eslint-disable camelcase */
export type UserResponseDef = {
  data: {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
    email: string;
  };
};
