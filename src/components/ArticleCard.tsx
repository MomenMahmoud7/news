import dayjs from "dayjs";
import React from "react";
import {
  Image,
  ListRenderItem,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import Text from "./UI/Text";
import { IMAGE_PLACEHOLDER } from "../configs/constants";
import useLanguage from "../hooks/useLanguage";
import useNavigation from "../hooks/useNavigation";
import useStyles, { GetStylesType } from "../hooks/useStyles";
import ArticleType from "../types/article.type";

const ArticleCard: ListRenderItem<ArticleType> = ({ item }) => {
  const { language } = useLanguage();
  const { unit, styles } = useStyles(getStyles);
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigate("News", {
          screen: "Article",
          params: { articleTitle: item.title },
        });
      }}
    >
      <Image
        source={{
          uri: item.urlToImage || IMAGE_PLACEHOLDER,
        }}
        height={160 * unit}
      />
      <View style={styles.title}>
        <Text
          color="heading"
          fontWeight="bold"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.title}
        </Text>
        <Text size="small" numberOfLines={3} ellipsizeMode="tail">
          {item.description}
        </Text>
        <View style={[styles.content]}>
          <Text size="small">
            {dayjs(item.publishedAt).locale(language).format("D MMM YYYY")}
          </Text>
          <Text size="small">{item.source?.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

type StylesType = {
  container: ViewStyle;
  title: ViewStyle;
  content: ViewStyle;
};

const getStyles: GetStylesType<StylesType> = ({ theme, unit }) => ({
  container: {
    marginVertical: 8 * unit,
    backgroundColor: theme.bg_secondary,
    ...theme.shadow,
  },
  title: {
    gap: 16 * unit,
    padding: 16 * unit,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ArticleCard;
