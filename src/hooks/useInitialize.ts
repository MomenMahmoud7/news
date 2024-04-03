import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { queryClient } from "../configs/queryClient";

const useInitialize = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const initializeLanguage = async () => {
      const language = await AsyncStorage.getItem("language");
      const selectedLanguage = language || getLocales()[0].languageCode || "en";
      await i18n.changeLanguage(selectedLanguage);
      await queryClient.setQueryData(["language"], selectedLanguage);
      await SplashScreen.hideAsync();
    };

    initializeLanguage();
  }, []);
};

export default useInitialize;
