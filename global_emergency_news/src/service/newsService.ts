import axios from "axios";
import { DJANGO_API } from "@/utils/MyConstants";

/**
 * ------------------------------
 *  Interfaces
 * ------------------------------
 */

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

/**
 * ------------------------------
 *  Axios Setup
 * ------------------------------
 */

const api = axios.create({
  baseURL: DJANGO_API,
  headers: { "Content-Type": "application/json" },
});

/**
 * ------------------------------
 *  Utility Helpers
 * ------------------------------
 */

// ✅ Normalize and format time frame strings safely
const formatTimeFrame = (value?: string): string | undefined => {
  if (!value) return undefined;
  return value.trim().toLowerCase().replace(/\s+/g, "_");
};

// ✅ Build query params cleanly (handles undefined values)
const buildQuery = (params: Record<string, string | undefined>): string => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) search.append(key, value);
  });
  return search.toString() ? `?${search.toString()}` : "";
};

/**
 * ------------------------------
 *  API Functions
 * ------------------------------
 */

/**
 * ✅ Fetch all news
 * Optionally filtered by time frame (e.g. "Today", "Last Week", "October 2025", etc.)
 */
export const fetchNews = async (
  timeFrame?: string
): Promise<PaginatedResponse<NewsArticle>> => {
  const query = buildQuery({ time_frame: formatTimeFrame(timeFrame) });
  const res = await api.get<PaginatedResponse<NewsArticle>>(`/news/${query}`);
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
  const query = buildQuery({
    category: category,
    time_frame: formatTimeFrame(timeFrame),
  });
  const res = await api.get<PaginatedResponse<NewsArticle>>(`/news/${query}`);
  return res.data;
};

/**
 * ✅ Fetch news by time frame only
 */
export const fetchNewsByTimeFrame = async (
  timeFrame: string
): Promise<PaginatedResponse<NewsArticle>> => {
  const query = buildQuery({ time_frame: formatTimeFrame(timeFrame) });
  const res = await api.get<PaginatedResponse<NewsArticle>>(`/news/${query}`);
  return res.data;
};

/**
 * ✅ Fetch next page by URL (handles both absolute and relative)
 */
export const fetchNextPageFromUrl = async (
  nextUrl: string
): Promise<PaginatedResponse<NewsArticle>> => {
  const url = nextUrl.startsWith("http") ? nextUrl : `${DJANGO_API}${nextUrl}`;
  const res = await axios.get<PaginatedResponse<NewsArticle>>(url);
  return res.data;
};

/**
 * ✅ Fetch all unique categories
 */
export const fetchCategories = async (): Promise<string[]> => {
  const res = await api.get<string[]>("/categories/");
  return res.data;
};

export default api;
