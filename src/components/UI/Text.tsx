import React, { FC, useMemo } from "react";
import { Text as NText, TextProps, TextStyle } from "react-native";

import useLanguage from "../../hooks/useLanguage";
import useStyles, { GetStylesType } from "../../hooks/useStyles";

type TextPropsType = {
  fontWeight?: "normal" | "bold";
  size?: "small" | "normal" | "medium" | "large";
  color?: "default" | "primary" | "heading" | "white";
} & TextProps;

const Text: FC<TextPropsType> = ({
  children,
  style,
  size = "normal",
  color = "default",
  fontWeight = "normal",
  ...props
}) => {
  const { direction } = useLanguage();
  const { styles } = useStyles(getStyles);

  const sizeStyle = useMemo(() => styles[size], [styles, size]);
  const colorStyle = useMemo(() => styles[color], [styles, color]);

  return (
    <NText
      {...props}
      style={[
        sizeStyle,
        colorStyle,
        {
          fontWeight,
          writingDirection: direction,
        },
        style,
      ]}
    >
      {children}
    </NText>
  );
};

type StylesType = {
  small: TextStyle;
  normal: TextStyle;
  medium: TextStyle;
  large: TextStyle;
  default: TextStyle;
  primary: TextStyle;
  heading: TextStyle;
  white: TextStyle;
};

const getStyles: GetStylesType<StylesType> = ({ theme, unit }) => ({
  small: {
    fontSize: 14 * unit,
    lineHeight: 18 * unit,
  },
  normal: {
    fontSize: 16 * unit,
    lineHeight: 20 * unit,
  },
  medium: {
    fontSize: 18 * unit,
    lineHeight: 22 * unit,
  },
  large: {
    fontSize: 28 * unit,
    lineHeight: 32 * unit,
  },
  default: {
    color: theme.text_primary,
  },
  primary: {
    color: theme.primary,
  },
  heading: {
    color: theme.text_secondary,
  },
  white: {
    color: "#FFFFFF",
  },
});

export default Text;
