import { nstackClient } from "../logic/nStackClient.logic";
import i18n, { DEFAULT_NS } from "../logic/localization.logic";
import { LanguagesEnum } from "../constants/languages.keys";

const updateLocalization = async () => {
  const {
    translation,
    translationMeta,
    availableLanguages,
  } = await nstackClient.appOpen();

  if (translation && translationMeta) {
    i18n.addResourceBundle(
      translationMeta.language.locale,
      DEFAULT_NS,
      translation
    );

    await i18n.changeLanguage(translationMeta.language.locale);
    return { availableLanguages };
  }
  return false;
};

function useNStackClient() {
  nstackClient.setLanguageByString = LanguagesEnum.ENGLISH;
  updateLocalization();
}

export default useNStackClient;
