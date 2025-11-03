// src/app/components/NewsFeed.tsx

"use client";

import { useEffect, useState, useRef } from "react";
import NewsCard from "./NewsCard";
import { DJANGO_API } from "../utils/MyConstants"; // ✅ import if not already

const API_URL = `${DJANGO_API}/news/`;

export default function NewsFeed({ initialData, category, search }) {
  const [articles, setArticles] = useState(initialData.results);
  const [nextUrl, setNextUrl] = useState(initialData.next);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // ✅ Reset articles when category or search changes
  useEffect(() => {
    async function fetchNewData() {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_URL}?page=1${category ? `&category=${category}` : ""}${
            search ? `&search=${search}` : ""
          }`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setArticles(data.results);
        setNextUrl(data.next);
      } catch (err) {
        console.error("Failed to fetch new category:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNewData();
  }, [category, search]); // 👈 reset whenever filters change

  // ✅ Infinite scroll observer
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
              const combined = [...prev, ...newData.results];
              const unique = combined.filter(
                (article, index, self) =>
                  index === self.findIndex((a) => a.id === article.id)
              );
              return unique;
            });
            setNextUrl(newData.next);
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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {articles.map((article) => (
          <NewsCard key={`${article.id}-${article.source}`} article={article} />
        ))}
      </div>

      <div ref={loaderRef} className="flex justify-center py-6">
        {loading ? (
          <p className="text-gray-500">Loading more...</p>
        ) : nextUrl ? (
          <p className="text-gray-400">Scroll down...</p>
        ) : (
          <p className="text-gray-400">No more articles</p>
        )}
      </div>
    </>
  );
}
