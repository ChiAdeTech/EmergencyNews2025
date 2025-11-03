"use client";

import { useEffect } from "react";
import { useNewsStore } from "@/store/newsStore";

export default function NewsPage() {
  const { news, loading, error, fetchAllNews } = useNewsStore();

  useEffect(() => {
    fetchAllNews();
  }, [fetchAllNews]);

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Latest News</h1>
      <ul className="space-y-4">
        {news.map((item) => (
          <li key={item.id} className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-600 text-sm">
              {item.source} • {new Date(item.published).toLocaleString()}
            </p>
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover rounded-lg mt-2"
              />
            )}
            <p className="mt-2 text-gray-800">{item.summary}</p>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              Read more →
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
