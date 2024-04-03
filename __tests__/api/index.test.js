import api from "../../src/api";
import { API_KEY, API_URL, SOURCES } from "../../src/configs/constants";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: "ok", articles: [] }),
  }),
);

describe("api", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("getAll fetches articles with the correct parameters", async () => {
    const language = "en";
    await api.getAll({ language });

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/everything?sources=${SOURCES.join(",")}&language=${language}&apiKey=${API_KEY}`,
    );
  });

  it("search fetches articles with the correct parameters", async () => {
    const language = "en";
    const searchQuery = "test";
    await api.search({ language, searchQuery });

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/everything?q=${searchQuery}&sources=${SOURCES.join(",")}&language=${language}&apiKey=${API_KEY}`,
    );
  });

  it("findOne fetches article with the correct parameters", async () => {
    const language = "en";
    const articleTitle = "test";
    const errorMessage = "Article not found";
    await api.findOne({ language, articleTitle, errorMessage });

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/everything?q="${articleTitle}"&searchIn=title&sources=${SOURCES.join(",")}&language=${language}&apiKey=${API_KEY}`,
    );
  });

  it("throws an error when fetch returns an error", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ status: "error", message: "Error message" }),
      }),
    );

    await expect(api.getAll({ language: "en" })).rejects.toThrow(
      "Error message",
    );
    await expect(
      api.search({ language: "en", searchQuery: "test" }),
    ).rejects.toThrow("Error message");
    await expect(
      api.findOne({
        language: "en",
        articleTitle: "test",
        errorMessage: "Error message",
      }),
    ).rejects.toThrow("Error message");
  });
});
