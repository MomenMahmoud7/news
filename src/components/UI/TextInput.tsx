import React, { FC, useState } from "react";
import {
  TextInput as NTextInput,
  TextInputProps,
  ViewStyle,
} from "react-native";

import useLanguage from "../../hooks/useLanguage";
import useStyles, { GetStylesType } from "../../hooks/useStyles";

const TextInput: FC<TextInputProps> = ({ style, ...props }) => {
  const { direction } = useLanguage();
  const { theme, styles } = useStyles(getStyles);

  const [isFocused, setIsFocused] = useState(false);

  return (
    <NTextInput
      {...props}
      style={[
        styles.input,
        {
          direction,
          textAlign: direction === "rtl" ? "right" : "left",
          writingDirection: direction,
        },
        isFocused ? styles.focused : {},
        style,
      ]}
      placeholderTextColor={theme.text_primary}
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
    />
  );
};

type StylesType = {
  input: ViewStyle;
  focused: ViewStyle;
};

const getStyles: GetStylesType<StylesType> = ({ theme, unit }) => ({
  input: {
    paddingVertical: 12 * unit,
    paddingHorizontal: 16 * unit,
    borderWidth: 1,
    borderColor: "transparent",
    fontSize: 16 * unit,
    lineHeight: 20 * unit,
    color: theme.text_secondary,
    backgroundColor: theme.bg_primary,
  },
  focused: {
    borderColor: theme.primary,
  },
});

export default TextInput;
