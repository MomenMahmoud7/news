import { API_KEY, API_URL, SOURCES } from "../configs/constants";
import ArticleType from "../types/article.type";

type GetAllParamsType = {
  language: string;
};

type SearchParamsType = {
  language: string;
  searchQuery: string;
};

type FindOneParamsType = {
  language: string;
  articleTitle: string;
};

type APIType = {
  getAll: (params: GetAllParamsType) => Promise<ArticleType[]>;
  search: (params: SearchParamsType) => Promise<ArticleType[]>;
  findOne: (params: FindOneParamsType) => Promise<ArticleType>;
};

const api: APIType = {
  getAll: async ({ language }) => {
    const response = await fetch(
      `${API_URL}/everything?sources=${SOURCES.join(",")}&language=${language}&apiKey=${API_KEY}`,
    );
    const data = await response.json();
    if (data.status === "error") throw new Error(data.message);
    return data.articles;
  },

  search: async ({ language, searchQuery }) => {
    const response = await fetch(
      `${API_URL}/everything?q=${searchQuery}&sources=${SOURCES.join(",")}&language=${language}&apiKey=${API_KEY}`,
    );
    const data = await response.json();
    if (data.status === "error") throw new Error(data.message);
    return data.articles;
  },

  findOne: async ({ language, articleTitle }) => {
    const response = await fetch(
      `${API_URL}/everything?q="${articleTitle}"&searchIn=title&sources=${SOURCES.join(",")}&language=${language}&apiKey=${API_KEY}`,
    );
    const data = await response.json();
    if (data.status === "error") throw new Error(data.message);
    return data.articles[0];
  },
};

export default api;
