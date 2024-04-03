import React from "react";
import { ViewStyle } from "react-native";

import LanguageSwitch from "../components/LanguageSwitch";
import ThemeSwitch from "../components/ThemeSwitch";
import Layout from "../components/UI/Layout";
import useLanguage from "../hooks/useLanguage";
import useStyles, { GetStylesType } from "../hooks/useStyles";

const Settings = () => {
  const { t } = useLanguage();
  const { styles } = useStyles(getStyles);

  return (
    <Layout title={t("settings")} style={styles.container}>
      <ThemeSwitch />
      <LanguageSwitch />
    </Layout>
  );
};

type StylesType = {
  container: ViewStyle;
};

const getStyles: GetStylesType<StylesType> = ({ unit }) => ({
  container: {
    padding: 24 * unit,
  },
});

export default Settings;
