import { renderHook } from "@testing-library/react-hooks";

import useStyles from "../../src/hooks/useStyles";

jest.mock("../../src/hooks/useTheme", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    width: 430,
    colorScheme: "light",
    theme: {
      primary: "blue",
      text_primary: "black",
    },
    unit: 1,
    changeTheme: jest.fn(),
  })),
}));

describe("useStyles", () => {
  it("generates styles based on getStyles function", () => {
    const getStyles = ({ theme }) => ({
      container: {
        backgroundColor: theme.primary,
      },
      text: {
        color: theme.text_primary,
      },
    });

    const { result } = renderHook(() => useStyles(getStyles));
    const { styles } = result.current;

    expect(styles.container.backgroundColor).toBe("blue");
    expect(styles.text.color).toBe("black");
  });
});
