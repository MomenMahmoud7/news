import { useQuery } from "@tanstack/react-query";

import useLanguage from "./useLanguage";
import api from "../api";
import ArticleType from "../types/article.type";

const useNewsSearch = (searchQuery: string) => {
  const { language } = useLanguage();

  return useQuery<ArticleType[]>({
    queryKey: ["news", language, searchQuery],
    queryFn: () => api.search({ language, searchQuery }),
  });
};

export default useNewsSearch;
