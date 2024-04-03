import { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import React, { FC } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Error from "../components/UI/Error";
import Layout from "../components/UI/Layout";
import Loading from "../components/UI/Loading";
import Text from "../components/UI/Text";
import { IMAGE_PLACEHOLDER } from "../configs/constants";
import useGetArticle from "../hooks/useGetArticle";
import useLanguage from "../hooks/useLanguage";
import useStyles, { GetStylesType } from "../hooks/useStyles";
import { NewsNavigationParamList } from "../types/parmlist.type";

const Article: FC<
  NativeStackScreenProps<NewsNavigationParamList, "Article">
> = ({
  route: {
    params: { articleTitle },
  },
}) => {
  const { bottom } = useSafeAreaInsets();
  const { language } = useLanguage();
  const { unit, styles } = useStyles(getStyles);

  const {
    data: article,
    isLoading,
    isRefetching,
    isError,
    error,
    refetch,
  } = useGetArticle(articleTitle);

  return (
    <Layout withBack>
      {isLoading || isRefetching ? (
        <Loading />
      ) : isError ? (
        <Error error={error.message} onRefresh={refetch} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={refetch} />
          }
          contentContainerStyle={{ paddingBottom: bottom + 16 * unit }}
        >
          <Image
            source={{
              uri: article?.urlToImage || IMAGE_PLACEHOLDER,
            }}
            height={320 * unit}
          />
          <View style={styles.container}>
            <Text size="large" color="heading" fontWeight="bold">
              {article?.title.trim()}
            </Text>
            <View style={styles.subtitle}>
              <Text color="heading" fontWeight="bold">
                {article?.source.name.trim()}
              </Text>
              <Text size="small">
                {`${article?.author} - ${dayjs(article?.publishedAt)
                  .locale(language)
                  .format("D MMM YYYY")}`}
              </Text>
            </View>
            <Text>{article?.description?.trim()}</Text>
            <Text>{article?.content?.trim()}</Text>
          </View>
        </ScrollView>
      )}
    </Layout>
  );
};

type StylesType = {
  container: ViewStyle;
  subtitle: ViewStyle;
};

const getStyles: GetStylesType<StylesType> = ({ unit }) => ({
  container: {
    gap: 16 * unit,
    padding: 16 * unit,
  },
  subtitle: {
    alignItems: "flex-start",
  },
});

export default Article;
