import * as Linking from "expo-linking";

const prefix = Linking.createURL("/");

const linking = {
  prefixes: [prefix],
  initialRouteName: "News",
  config: {
    screens: {
      News: {
        path: "articles",
        initialRouteName: "Articles",
        screens: {
          Article: {
            path: ":articleTitle",
            parse: {
              articleTitle: (articleTitle: string) => decodeURI(articleTitle),
            },
          },
        },
      },
      Settings: {
        path: "settings",
      },
    },
  },
};

export default linking;
