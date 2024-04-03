import { FontAwesome6 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { FC, PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Text from "./Text";
import useLanguage from "../../hooks/useLanguage";
import useNavigation from "../../hooks/useNavigation";
import useStyles, { GetStylesType } from "../../hooks/useStyles";
type LayoutPropsType = {
  title?: string;
  withBack?: boolean;
  header?: FC;
  style?: StyleProp<ViewStyle>;
} & PropsWithChildren;

const Layout: FC<LayoutPropsType> = ({
  children,
  title = "",
  withBack = false,
  header,
  style,
}) => {
  const { top } = useSafeAreaInsets();
  const { colorScheme, theme, unit, styles } = useStyles(getStyles);
  const { direction } = useLanguage();
  const { goBack } = useNavigation();

  return (
    <View style={[styles.container, styles.full, { direction }]}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <KeyboardAvoidingView
        style={styles.full}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={[styles.header, { paddingTop: top + 16 * unit }]}>
          {withBack ? (
            <TouchableOpacity
              onPress={goBack}
              style={{ alignItems: "flex-start" }}
            >
              <FontAwesome6
                key={direction}
                name={direction === "rtl" ? "chevron-right" : "chevron-left"}
                size={24 * unit}
                color={theme.text_secondary}
              />
            </TouchableOpacity>
          ) : (
            <Text size="large" color="heading" fontWeight="bold">
              {title}
            </Text>
          )}
          {!!header && header({})}
        </View>
        <View style={[styles.full, style]}>{children}</View>
      </KeyboardAvoidingView>
    </View>
  );
};

type StylesType = {
  container: ViewStyle;
  full: ViewStyle;
  header: ViewStyle;
  content: ViewStyle;
};

const getStyles: GetStylesType<StylesType> = ({ theme, unit }) => ({
  container: {
    backgroundColor: theme.bg_primary,
  },
  full: {
    flex: 1,
  },
  header: {
    gap: 16 * unit,
    paddingBottom: 16 * unit,
    paddingHorizontal: 24 * unit,
    backgroundColor: theme.bg_secondary,
    ...theme.shadow,
  },
  content: {
    flex: 1,
  },
});

export default Layout;
