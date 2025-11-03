"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CategoryFilter from "./components/CategoryFilter";
import NewsFeed from "./components/NewsFeed";
import { DJANGO_API } from "./utils/MyConstants";

const API_URL = `${DJANGO_API}/news/`;
const CATEGORY_URL = `${DJANGO_API}/categories/`;

export default function Home() {
  const searchParams = useSearchParams();
  const selected = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";

  const [articles, setArticles] = useState<any[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Fetch categories once
  useEffect(() => {
    fetch(CATEGORY_URL)
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  // ✅ Fetch news when URL searchParams change
  useEffect(() => {
    setLoading(true);
    fetch(
      `${API_URL}?page=1${selected ? `&category=${selected}` : ""}${
        search ? `&search=${search}` : ""
      }`,
      { cache: "no-store" }
    )
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.results);
        setNextUrl(data.next);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selected, search]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📰 Emergency News 2025
      </h1>

      <CategoryFilter categories={categories} selected={selected} />

      {loading ? (
        <p className="text-center text-gray-500 mt-6">Loading news...</p>
      ) : (
        <NewsFeed
          initialData={{ results: articles, next: nextUrl }}
          category={selected}
          search={search}
        />
      )}
    </main>
  );
}
