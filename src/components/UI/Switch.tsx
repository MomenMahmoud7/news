import React, { FC } from "react";
import { View, TouchableOpacity, ViewStyle } from "react-native";

import Text from "./Text";
import useStyles, { GetStylesType } from "../../hooks/useStyles";

type OptionType = {
  label: string;
  value: any;
};

type SwitchPropsType = {
  title: string;
  selected: string;
  options: OptionType[];
  onChange: (value: any) => void;
};

const Switch: FC<SwitchPropsType> = ({
  title,
  selected,
  options,
  onChange,
}) => {
  const { styles } = useStyles(getStyles);

  return (
    <View style={styles.container}>
      <Text size="medium" color="heading" fontWeight="bold">
        {title}
      </Text>
      <View style={[styles.switch]}>
        {options.map(({ label, value }) => (
          <TouchableOpacity
            key={value}
            style={[styles.item, selected === value ? styles.selected : {}]}
            onPress={() => onChange(value)}
          >
            <Text
              fontWeight={selected === value ? "bold" : "normal"}
              color={selected === value ? "white" : "default"}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

type StylesType = {
  container: ViewStyle;
  switch: ViewStyle;
  item: ViewStyle;
  selected: ViewStyle;
};

const getStyles: GetStylesType<StylesType> = ({ theme, unit }) => ({
  container: {
    paddingVertical: 8 * unit,
  },
  switch: {
    flexDirection: "row",
    marginVertical: 16 * unit,
    backgroundColor: theme.bg_secondary,
  },
  item: {
    flex: 1,
    alignItems: "center",
    padding: 16 * unit,
  },
  selected: {
    backgroundColor: theme.primary,
  },
});

export default Switch;
