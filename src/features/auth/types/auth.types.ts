export type TokenDef = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
};

export type CookieTokenDef = Pick<TokenDef, "accessToken" | "tokenType"> & {
  expiresAt: Date;
};
