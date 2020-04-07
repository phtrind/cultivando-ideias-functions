import Translation from "../models/translation";

export default class TranslationService {
  private static readonly defaultLanguage = "pt-BR";
  static getTranslation = (
    requestedLanguage: string,
    translations: Translation[]
  ): string => {
    let language = TranslationService.defaultLanguage;
    if (requestedLanguage) {
      language = requestedLanguage;
    }
    const foundTranslation = translations.filter(
      (x) => x.language === language
    );
    if (foundTranslation && foundTranslation.length > 0) {
      return foundTranslation[0].data;
    }
    return translations[0].data;
  };
}
