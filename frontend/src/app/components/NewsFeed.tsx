// src/app/components/NewsFeed.tsx

"use client";

import { useEffect, useState, useRef } from "react";
import NewsCard from "./NewsCard";
import { DJANGO_API } from "../utils/MyConstants";

const API_URL = `${DJANGO_API}/news/`;

export default function NewsFeed({ initialData = { results: [], next: null }, category, search }) {
  const [articles, setArticles] = useState(initialData.results || []);
  const [nextUrl, setNextUrl] = useState(initialData.next || null);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // ✅ Fetch when category/search changes
  useEffect(() => {
    async function fetchNewData() {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_URL}?page=1${category ? `&category=${category}` : ""}${search ? `&search=${search}` : ""}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setArticles(data.results || []);
        setNextUrl(data.next || null);
      } catch (err) {
        console.error("Failed to fetch new category:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNewData();
  }, [category, search]);

  // ✅ Infinite scroll
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        const first = entries[0];
        if (first.isIntersecting && nextUrl && !loading) {
          setLoading(true);
          try {
            const res = await fetch(nextUrl, { cache: "no-store" });
            const newData = await res.json();
            setArticles((prev) => {
              const combined = [...prev, ...(newData.results || [])];
              const unique = combined.filter(
                (article, index, self) => index === self.findIndex((a) => a.id === article.id)
              );
              return unique;
            });
            setNextUrl(newData.next || null);
          } catch (error) {
            console.error("Failed to fetch more news:", error);
          } finally {
            setLoading(false);
          }
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [nextUrl, loading]);

  return (
    <div>
      {articles.length > 0 ? (
        <div className="">
          {articles.map((article) => (
            <NewsCard key={`${article.id}-${article.source}`} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-6">No articles found.</p>
      )}

      <div ref={loaderRef} className="flex justify-center py-6">
        {loading ? (
          <p className="text-gray-500">Loading more...</p>
        ) : nextUrl ? (
          <p className="text-gray-400">Scroll down...</p>
        ) : (
          <p className="text-gray-400">No more articles</p>
        )}
      </div>
    </div>
  );
}
