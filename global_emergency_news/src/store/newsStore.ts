// src/store/newsStore.ts
import { create } from "zustand";
import {
  NewsArticle,
  fetchNews,
  fetchNewsByCategory,
  fetchCategories,
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

  // ✅ Helper to apply timeframe filter
  fetchAllNews: async (timeFrame) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchNews(timeFrame);
      set({
        news: data.results,
        next: data.next,
        previous: data.previous,
        count: data.count,
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch news", loading: false });
    }
  },

  // ✅ Fetch by category (with optional time filter)
  fetchNewsByCategory: async (category: string, timeFrame?: string) => {
    set({ loading: true, error: null, selectedCategory: category });
    try {
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
    }
  },

  // ✅ Pagination (respects filters)
  fetchNextPage: async () => {
    const { next } = get();
    if (!next) return;

    set({ loading: true });
    try {
      const res = await fetch(next);
      const data = await res.json();
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

  // ✅ Categories
  fetchAllCategories: async () => {
    try {
      const data = await fetchCategories();
      set({ categories: data });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch categories" });
    }
  },

  // ✅ Set time frame filter
  setTimeFrame: (timeFrame) => {
    set({ selectedTimeFrame: timeFrame });
  },
}));
