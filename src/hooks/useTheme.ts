import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useColorScheme, useWindowDimensions } from "react-native";

import { DESIGN_WIDTH } from "../configs/constants";
import { queryClient } from "../configs/queryClient";
import themes from "../themes";

export type ColorSchemeType = "light" | "dark";

const useTheme = () => {
  const { width } = useWindowDimensions();
  const currColorScheme = useColorScheme() || "light";

  const { data: colorScheme = currColorScheme } = useQuery<ColorSchemeType>({
    queryKey: ["colorScheme"],
    gcTime: Infinity,
    staleTime: Infinity,
  });

  const unit = useMemo(() => {
    const percentage = width / DESIGN_WIDTH;
    return percentage > 1.5 ? 1.5 : percentage;
  }, [width]);

  const theme = useMemo(() => themes[colorScheme], [colorScheme]);

  const changeTheme = (_colorScheme: ColorSchemeType) => {
    queryClient.setQueryData(["colorScheme"], _colorScheme);
  };

  return { width, colorScheme, theme, unit, changeTheme };
};

export default useTheme;
