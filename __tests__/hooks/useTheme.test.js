import { useQuery } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";
import { useColorScheme, useWindowDimensions } from "react-native";

import { queryClient } from "../../src/configs/queryClient";
import useTheme from "../../src/hooks/useTheme";
import themes from "../../src/themes";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("react-native", () => ({
  useWindowDimensions: jest.fn(),
  useColorScheme: jest.fn(),
}));

jest.mock("../../src/configs/queryClient", () => ({
  queryClient: {
    setQueryData: jest.fn(),
  },
}));

const mockWidth = 430;
const mockColorScheme = "light";

describe("useTheme", () => {
  beforeEach(() => {
    useQuery.mockReturnValue({ data: undefined });
    useWindowDimensions.mockReturnValue({ width: mockWidth, height: 667 });
    useColorScheme.mockReturnValue(mockColorScheme);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns default theme values", () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.width).toBe(mockWidth);
    expect(result.current.colorScheme).toBe(mockColorScheme);
    expect(result.current.theme).toEqual(themes[mockColorScheme]);
    expect(result.current.unit).toEqual(1);
    expect(result.current.changeTheme).toBeDefined();
  });

  it("changes theme on changeTheme call", () => {
    const { result } = renderHook(() => useTheme());

    const newColorScheme = "dark";
    result.current.changeTheme(newColorScheme);

    expect(queryClient.setQueryData).toHaveBeenCalledWith(
      ["colorScheme"],
      newColorScheme,
    );
  });
});
