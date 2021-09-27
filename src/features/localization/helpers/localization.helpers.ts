import i18next, { nstackClient } from "../config/localization.config";
import { DEFAULT_NS } from "../constants/localization.constants";

export const updateLocalization = async () => {
  if (!nstackClient) {
    return false;
  }

  const { translation, translationMeta, availableLanguages } =
    await nstackClient.appOpen();

  if (translation && translationMeta) {
    i18next.addResourceBundle(
      translationMeta.language.locale,
      DEFAULT_NS,
      translation
    );

    await i18next.changeLanguage(translationMeta.language.locale);
    return { availableLanguages };
  }
  return false;
};

export const changeLanguage = (locale: string) => {
  if (nstackClient) {
    nstackClient.setLanguageByString = locale;
  }
  updateLocalization();
};

export const getCountries = async () => {
  const { countries = [] } =
    (await nstackClient?.getGeographyCountries()) ?? {};

  return { countries };
};
