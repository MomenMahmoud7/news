import _debounce from "lodash/debounce";
import React, { useMemo, useState } from "react";
import { FlatList, RefreshControl, ViewStyle } from "react-native";

import ArticleCard from "../components/ArticleCard";
import Error from "../components/UI/Error";
import Layout from "../components/UI/Layout";
import Loading from "../components/UI/Loading";
import TextInput from "../components/UI/TextInput";
import useGetNews from "../hooks/useGetNews";
import useLanguage from "../hooks/useLanguage";
import useNewsSearch from "../hooks/useNewsSearch";
import useStyles, { GetStylesType } from "../hooks/useStyles";

const News = () => {
  const { t } = useLanguage();
  const { styles } = useStyles(getStyles);
  const [text, setText] = useState("");

  const selectedHook = useMemo(
    () => (text ? useNewsSearch : useGetNews),
    [text],
  );

  const { data, refetch, isRefetching, isLoading, error, isError } =
    selectedHook(text);

  return (
    <Layout
      title={t("news")}
      header={() => (
        <TextInput
          placeholder={t("search")}
          onChangeText={_debounce(setText, 2000)}
        />
      )}
    >
      {isLoading || isRefetching ? (
        <Loading />
      ) : isError ? (
        <Error error={error.message} onRefresh={refetch} />
      ) : (
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={(props) => <ArticleCard {...props} />}
          style={styles.container}
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={refetch} />
          }
        />
      )}
    </Layout>
  );
};

type StylesType = {
  container: ViewStyle;
  content: ViewStyle;
};

const getStyles: GetStylesType<StylesType> = ({ unit }) => ({
  container: {
    flex: 1,
  },
  content: {
    padding: 24 * unit,
  },
});

export default News;
