import { NavigationProp, useNavigation } from "@react-navigation/native";

import { TabsNavigationParamListType } from "../types/parmlist.type";

export default () =>
  useNavigation<NavigationProp<TabsNavigationParamListType>>();
