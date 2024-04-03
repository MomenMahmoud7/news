import React from "react";

import Switch from "./UI/Switch";
import useLanguage from "../hooks/useLanguage";
import useTheme from "../hooks/useTheme";

const ThemeSwitch = () => {
  const { t, language } = useLanguage();
  const { colorScheme, changeTheme } = useTheme();

  return (
    <Switch
      key={language}
      title={t("theme")}
      selected={colorScheme}
      options={[
        { label: t("light"), value: "light" },
        { label: t("dark"), value: "dark" },
      ]}
      onChange={changeTheme}
    />
  );
};

export default ThemeSwitch;
