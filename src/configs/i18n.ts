import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ar from "../i18n/ar";
import en from "../i18n/en";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  fallbackLng: getLocales()[0].languageCode || "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
