import { RequestDef } from "types/request";

export type AuthStateDef = {
  accessToken?: string | null;
  signIn: RequestDef;
};
