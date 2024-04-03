import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import NewsNavigation from "./NewsNavigation";
import TabsNavigationBar from "../components/TabsNavigationBar";
import useInitialize from "../hooks/useInitialize";
import Settings from "../screens/Settings";
import { TabsNavigationParamListType } from "../types/parmlist.type";

const Tab = createBottomTabNavigator<TabsNavigationParamListType>();

const TabsNavigation = () => {
  useInitialize();

  return (
    <Tab.Navigator
      initialRouteName="News"
      backBehavior="initialRoute"
      tabBar={(props) => <TabsNavigationBar {...props} />}
    >
      <Tab.Screen
        name="News"
        component={NewsNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigation;
