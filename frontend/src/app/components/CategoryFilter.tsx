"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState } from "react";

export default function CategoryFilter({ categories, selected }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [pendingCategory, setPendingCategory] = useState<string | null>(null);

  const handleCategoryClick = (cat: string | null) => {
    setPendingCategory(cat);

    const params = new URLSearchParams(searchParams.toString());

    if (cat) params.set("category", cat);
    else params.delete("category");

    params.delete("page"); // always reset to page 1

    const newUrl = `/?${params.toString()}`;
    startTransition(() => {
      router.push(newUrl);
    });
  };

  // ✅ Step 1: Filter and clean up categories
  const ignoredCategories = ["more-news", "top-stories", "headlines", "latest-news"];
  const cleanedCategories = categories
    .filter((cat) => cat && !ignoredCategories.includes(cat.toLowerCase())) // remove unwanted ones
    .map((cat) => cat.trim()); // clean whitespace, just in case

  // ✅ Step 2: Render
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {/* 'All' Button */}
      <button
        onClick={() => handleCategoryClick(null)}
        className={`px-4 py-2 rounded-full transition-colors duration-200 ${
          !selected
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
        }`}
        disabled={isPending && pendingCategory === null}
      >
        {isPending && pendingCategory === null ? "Loading..." : "All"}
      </button>

      {/* Category Buttons */}
      {cleanedCategories.map((cat) => {
        const isSelected = selected === cat;
        const isLoading = isPending && pendingCategory === cat;

        return (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`px-4 py-2 rounded-full transition-colors duration-200 ${
              isSelected
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
            disabled={isLoading}
          >
            {isLoading
              ? "Loading..."
              : cat
                  .replace(/[-_]/g, " ") // replace both hyphens & underscores
                  .replace(/\b\w/g, (char) => char.toUpperCase()) // capitalize words
            }
          </button>
        );
      })}
    </div>
  );
}
