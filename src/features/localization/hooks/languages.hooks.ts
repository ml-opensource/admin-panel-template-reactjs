import i18n from "../logic/localization.logic";

function useLanguages() {
  const languages: Array<string> = Object.keys(i18n.store.data);

  return languages;
}

export default useLanguages;
