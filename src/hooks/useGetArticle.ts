import { useQuery } from "@tanstack/react-query";

import useLanguage from "./useLanguage";
import api from "../api";
import ArticleType from "../types/article.type";

const useGetArticle = (articleTitle: string) => {
  const { language, t } = useLanguage();

  return useQuery<ArticleType>({
    queryKey: ["news", language, articleTitle],
    queryFn: async () => {
      const article = await api.findOne({ language, articleTitle });
      if (!article) throw new Error(t("articleError"));
      return article;
    },
  });
};

export default useGetArticle;
