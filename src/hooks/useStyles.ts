import { useMemo } from "react";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

import useTheme from "./useTheme";
import { ThemeType } from "../themes";

export type GetStylesType<T> = (props: {
  width: number;
  unit: number;
  theme: ThemeType;
}) => {
  [P in keyof T]: ViewStyle & TextStyle & ImageStyle;
};

const useStyles = <T>(getStyles: GetStylesType<T>) => {
  const { width, colorScheme, theme, unit, changeTheme } = useTheme();

  const styles = useMemo(() => {
    const _styles = getStyles({ width, unit, theme });

    return StyleSheet.create(_styles);
  }, [width, unit, theme, getStyles]);

  return { width, colorScheme, theme, unit, changeTheme, styles };
};

export default useStyles;
