import { MaterialIcons } from "@expo/vector-icons";
import React, { FC } from "react";
import { RefreshControl, ScrollView, TextStyle, ViewStyle } from "react-native";

import Text from "./Text";
import useStyles, { GetStylesType } from "../../hooks/useStyles";

type ErrorPropsType = {
  error: string;
  onRefresh: () => void;
};

const Error: FC<ErrorPropsType> = ({ error, onRefresh }) => {
  const { theme, styles, unit } = useStyles(getStyles);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }
    >
      <MaterialIcons
        name="error-outline"
        size={140 * unit}
        color={theme.danger}
      />
      <Text size="medium" style={styles.text}>
        {error}
      </Text>
    </ScrollView>
  );
};

type StylesType = {
  container: ViewStyle;
  content: ViewStyle;
  text: TextStyle;
};

const getStyles: GetStylesType<StylesType> = ({ theme, unit }) => ({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32 * unit,
  },
  text: {
    textAlign: "center",
    marginTop: 8 * unit,
    color: theme.danger,
  },
});

export default Error;
