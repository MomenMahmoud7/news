import { useQuery } from "@tanstack/react-query";

import useLanguage from "./useLanguage";
import api from "../api";
import ArticleType from "../types/article.type";

const useGetNews = () => {
  const { language } = useLanguage();

  return useQuery<ArticleType[]>({
    queryKey: ["news", language],
    queryFn: () => api.getAll({ language }),
  });
};

export default useGetNews;
