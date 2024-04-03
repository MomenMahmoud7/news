import { NavigatorScreenParams } from "@react-navigation/native";

type ArticleScreenType = { articleTitle: string };

export type NewsNavigationParamList = {
  Articles: undefined;
  Article: ArticleScreenType;
};

export type TabsNavigationParamListType = {
  News: NavigatorScreenParams<NewsNavigationParamList>;
  Settings: undefined;
};
