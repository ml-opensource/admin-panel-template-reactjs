import { NstackInstance } from "@nstack-io/javascript-sdk";

const Env: any = process.env;

const INITIAL_LANG = "en-EN";

export const nstackClient = new NstackInstance({
  appId: Env.REACT_APP_NSTACK_APP_ID,
  apiKey: Env.REACT_APP_NSTACK_API_KEY,
  version: Env.VERSION,
  initialLanguage: INITIAL_LANG,
  meta: `web;${Env.NODE_ENV}`,
});
