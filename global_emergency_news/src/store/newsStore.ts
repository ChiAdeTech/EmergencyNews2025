import { create } from "zustand";
import {
  NewsArticle,
  fetchNews,
  fetchNewsByCategory,
  fetchCategories,
  fetchNextPageFromUrl,
} from "@/service/newsService";

interface NewsState {
  news: NewsArticle[];
  next: string | null;
  previous: string | null;
  count: number;
  categories: string[];
  selectedCategory: string | null;
  selectedTimeFrame: string | null;
  loading: boolean;
  error: string | null;

  fetchAllNews: (timeFrame?: string) => Promise<void>;
  fetchNewsByCategory: (category: string, timeFrame?: string) => Promise<void>;
  fetchNextPage: () => Promise<void>;
  fetchAllCategories: () => Promise<void>;
  setTimeFrame: (timeFrame: string | null) => void;
  clearFilters: () => void;
}

export const useNewsStore = create<NewsState>((set, get) => ({
  news: [],
  next: null,
  previous: null,
  count: 0,
  categories: [],
  selectedCategory: null,
  selectedTimeFrame: null,
  loading: false,
  error: null,

  /**
   * ✅ Fetch all news (optionally filtered by time frame)
   */
  fetchAllNews: async (timeFrame) => {
    set({ loading: true, error: null, selectedCategory: null });
    try {
      const data = await fetchNews(timeFrame);
      set({
        news: data.results,
        next: data.next,
        previous: data.previous,
        count: data.count,
        selectedTimeFrame: timeFrame || null,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch news",
        loading: false,
      });
    }
  },

  /**
   * ✅ Fetch news by category (with optional time frame)
   */
  fetchNewsByCategory: async (category, timeFrame) => {
    set({
      loading: true,
      error: null,
      selectedCategory: category,
      selectedTimeFrame: timeFrame || null,
    });
    try {
      document.body.style.cursor = "wait";
      const data = await fetchNewsByCategory(category, timeFrame);
      set({
        news: data.results,
        next: data.next,
        previous: data.previous,
        count: data.count,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch category news",
        loading: false,
      });
    }finally{
      document.body.style.cursor = "default";
    }
  },

  /**
   * ✅ Fetch next page (preserves filters)
   */
  fetchNextPage: async () => {
    const { next } = get();
    if (!next) return;

    set({ loading: true });
    try {
      const data = await fetchNextPageFromUrl(next);
      set((state) => ({
        news: [...state.news, ...data.results],
        next: data.next,
        previous: data.previous,
        count: data.count,
        loading: false,
      }));
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch next page",
        loading: false,
      });
    }
  },

  /**
   * ✅ Fetch all unique categories
   */
  fetchAllCategories: async () => {
    try {
      const data = await fetchCategories();
      set({ categories: data });
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch categories",
      });
    }
  },

  /**
   * ✅ Update selected time frame filter
   */
  setTimeFrame: (timeFrame) => {
    set({ selectedTimeFrame: timeFrame });
  },

  /**
   * ✅ Clear all filters (category + time frame)
   */
  clearFilters: () => {
    set({ selectedCategory: null, selectedTimeFrame: null });
  },
}));
