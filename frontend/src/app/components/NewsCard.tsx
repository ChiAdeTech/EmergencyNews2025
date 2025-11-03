// src/app/components/NewsCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { FALLBACK_NEWS_IMAGE } from "../utils/MyConstants";

export default function NewsCard({ article }) {
  const {
    id,
    title,
    summary,
    category,
    published_at,
    image,
    source_url,
    source_name,
  } = article;

  const formattedDate = published_at
    ? new Date(published_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div
      key={id}
      className="flex flex-col sm:flex-row bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      {/* Text Content */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-2">
            {category && (
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                {category}
              </span>
            )}
            {formattedDate && <span>{formattedDate}</span>}
          </div>

          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 leading-snug mb-2">
            {title}
          </h2>

          {summary && (
            <p className="text-gray-600 text-sm sm:text-base line-clamp-3">
              {summary}
            </p>
          )}
        </div>

        {source_url && (
          <Link
            href={source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Read full story →
          </Link>
        )}
      </div>

      {/* Image Section */}
      <div className="relative w-full sm:w-56 h-48 sm:h-auto flex-shrink-0">
        <img
          src={image || FALLBACK_NEWS_IMAGE}
          alt={title || "News image"}
          className="object-cover w-full h-full"
        />

      </div>
    </div>
  );
}
