/**
 * API response status codes enum
 */
export enum ApiStatusCodes {
  SUCCESS = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

/**
 * Approach for open api based projects:
 */
// import { Configuration } from "@app/@generated";
// import { getRefreshedToken } from "@app/features/auth/auth";

// import { ENV } from "./env";

// const apiClientConfiguration = new Configuration();
// apiClientConfiguration.basePath = ENV.API_HOST;
// apiClientConfiguration.accessToken = async () => {
//   const accessToken = await getRefreshedToken();
//   return accessToken ?? "";
// };
// export { apiClientConfiguration };
