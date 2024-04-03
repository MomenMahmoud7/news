import dark from "./dark";
import light from "./light";

export type ThemeType = typeof light | typeof dark;

export default { light, dark };
