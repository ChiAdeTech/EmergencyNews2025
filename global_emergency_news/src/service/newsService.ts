import axios from "axios";
import { DJANGO_API } from "@/utils/MyConstants";

export interface NewsArticle {
  id: number;
  title: string;
  link: string;
  category: string;
  published: string;
  summary: string;
  source: string;
  image?: string | null;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Create axios instance
const api = axios.create({
  baseURL: DJANGO_API,
  headers: { "Content-Type": "application/json" },
});

/**
 * ✅ Fetch all news
 * Optionally filtered by time frame (e.g., "Today", "Yesterday", "Last week", "Last month")
 */
export const fetchNews = async (
  timeFrame?: string
): Promise<PaginatedResponse<NewsArticle>> => {
  let url = "/news/";

  // Append ?time_frame=... if provided
  if (timeFrame) {
    url += `?time_frame=${encodeURIComponent(timeFrame.toLowerCase().replace(/\s+/g, "_"))}`;
  }

  const res = await api.get<PaginatedResponse<NewsArticle>>(url);
  return res.data;
};

/**
 * ✅ Fetch news by category
 * Optionally filtered by time frame
 */
export const fetchNewsByCategory = async (
  category: string,
  timeFrame?: string
): Promise<PaginatedResponse<NewsArticle>> => {
  let url = `/news/?category=${encodeURIComponent(category)}`;

  if (timeFrame) {
    url += `&time_frame=${encodeURIComponent(timeFrame.toLowerCase().replace(/\s+/g, "_"))}`;
  }

  const res = await api.get<PaginatedResponse<NewsArticle>>(url);
  return res.data;
};

/**
 * ✅ Fetch next page by URL (Django paginated `next`)
 */
export const fetchNextPageFromUrl = async (
  nextUrl: string
): Promise<PaginatedResponse<NewsArticle>> => {
  const url = nextUrl.startsWith("http") ? nextUrl : `${DJANGO_API}${nextUrl}`;
  const res = await axios.get<PaginatedResponse<NewsArticle>>(url);
  return res.data;
};

/**
 * ✅ Fetch all categories
 */
export const fetchCategories = async (): Promise<string[]> => {
  const res = await api.get<string[]>("/categories/");
  return res.data;
};

export default api;
