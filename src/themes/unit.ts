import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const DESIGN_WIDTH = 430;
const PERCENTAGE = SCREEN_WIDTH / DESIGN_WIDTH;
const UNIT = PERCENTAGE > 1.5 ? 1.5 : PERCENTAGE;

export default UNIT;
