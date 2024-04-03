import React from "react";

import Switch from "./UI/Switch";
import useLanguage from "../hooks/useLanguage";

const LanguageSwitch = () => {
  const { t, language, changeLanguage } = useLanguage();

  return (
    <Switch
      title={t("language")}
      selected={language}
      options={[
        { label: t("english"), value: "en" },
        { label: t("arabic"), value: "ar" },
      ]}
      onChange={changeLanguage}
    />
  );
};

export default LanguageSwitch;
