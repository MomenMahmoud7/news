import React from "react";
import { ActivityIndicator, View, ViewStyle } from "react-native";

import useStyles, { GetStylesType } from "../../hooks/useStyles";

const Loading = () => {
  const { theme, styles, unit } = useStyles(getStyles);

  return (
    <View style={styles.container}>
      <ActivityIndicator size={48 * unit} color={theme.primary} />
    </View>
  );
};

type StylesType = {
  container: ViewStyle;
};

const getStyles: GetStylesType<StylesType> = () => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
