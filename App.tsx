import { NavigationContainer } from "@react-navigation/native";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import * as SplashScreen from "expo-splash-screen";
import { I18nextProvider } from "react-i18next";

import i18n from "./src/configs/i18n";
import linking from "./src/configs/linking";
import { asyncStoragePersister, queryClient } from "./src/configs/queryClient";
import TabsNavigation from "./src/navigations/TabsNavigation";

require("dayjs/locale/ar");

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <I18nextProvider i18n={i18n}>
        <NavigationContainer linking={linking}>
          <TabsNavigation />
        </NavigationContainer>
      </I18nextProvider>
    </PersistQueryClientProvider>
  );
}
