import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { reloadAsync } from "expo-updates";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { I18nManager } from "react-native";

export type LanguageType = "en" | "ar";

const useLanguage = () => {
  const { i18n, t } = useTranslation();

  const { data: language } = useQuery<LanguageType>({
    queryKey: ["language"],
    initialData: "en",
    gcTime: Infinity,
    staleTime: Infinity,
  });

  const direction: "rtl" | "ltr" = useMemo(
    () => (language === "ar" ? "rtl" : "ltr"),
    [language],
  );

  const changeLanguage = async (_language: LanguageType) => {
    if (language === _language) return;
    await AsyncStorage.setItem("language", _language);

    if (_language === "ar") {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    } else {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    }

    await reloadAsync();
  };

  return { i18n, t, language, changeLanguage, direction };
};

export default useLanguage;
