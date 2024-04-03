import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import useInitialize from "../hooks/useInitialize";
import Article from "../screens/Article";
import News from "../screens/News";
import { NewsNavigationParamList } from "../types/parmlist.type";

const Stack = createNativeStackNavigator<NewsNavigationParamList>();

const NewsNavigation = () => {
  useInitialize();

  return (
    <Stack.Navigator initialRouteName="Articles">
      <Stack.Screen
        name="Articles"
        component={News}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Article"
        component={Article}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default NewsNavigation;
