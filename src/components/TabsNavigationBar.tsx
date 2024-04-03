import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { FC } from "react";
import { Platform, TouchableOpacity, View, ViewStyle } from "react-native";

import Text from "./UI/Text";
import useLanguage from "../hooks/useLanguage";
import useStyles, { GetStylesType } from "../hooks/useStyles";

const TabsNavigationBar: FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { direction, t } = useLanguage();
  const { theme, unit, styles } = useStyles(getStyles);

  return (
    <View
      style={[
        styles.container,
        {
          direction,
          paddingBottom: Platform.OS === "ios" ? 32 * unit : 24 * unit,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <View key={index} style={[styles.tabWrapper]}>
            {index !== 0 && <View style={styles.divider} />}
            <TouchableOpacity
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tab}
            >
              <View style={styles.icon}>
                {!!options.tabBarIcon &&
                  options.tabBarIcon({
                    focused: isFocused,
                    color: isFocused ? theme.primary : theme.text_primary,
                    size: 28 * unit,
                  })}
              </View>
              <Text size="small" color={isFocused ? "primary" : "default"}>
                {t(label)}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default TabsNavigationBar;

type StylesType = {
  container: ViewStyle;
  tabWrapper: ViewStyle;
  tab: ViewStyle;
  divider: ViewStyle;
  icon: ViewStyle;
};

const getStyles: GetStylesType<StylesType> = ({ theme, unit }) => ({
  container: {
    flexDirection: "row",
    paddingTop: 16 * unit,
    paddingHorizontal: 16 * unit,
    backgroundColor: theme.bg_secondary,
    ...theme.shadow,
  },
  tabWrapper: {
    flex: 1,
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  divider: {
    borderStartWidth: 1,
    borderColor: theme.bg_primary,
  },
  icon: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: 32 * unit,
    height: 32 * unit,
    marginBottom: 8 * unit,
  },
});
