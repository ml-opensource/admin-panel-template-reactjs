import { NstackInstance } from "@nstack-io/javascript-sdk";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { ENV } from "@app/constants/env";

import { DEFAULT_NS, INITIAL_LANG } from "../constants/localization.constants";
import { NSTACK_ENV } from "../constants/localization.env";

export const nstackClient = new NstackInstance({
  appId: NSTACK_ENV.NSTACK_APP_ID,
  apiKey: NSTACK_ENV.NSTACK_API_KEY,
  version: ENV.VERSION,
  initialLanguage: INITIAL_LANG,
  meta: `web;${ENV.NODE_ENV}`,
});

i18next.use(initReactI18next).init({
  fallbackLng: INITIAL_LANG,
  lng: INITIAL_LANG,
  interpolation: {
    escapeValue: false,
  },
  defaultNS: DEFAULT_NS,
  resources: {},
});

export default i18next;
