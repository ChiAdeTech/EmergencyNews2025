"use client";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useEffect, useMemo } from "react";
import { useNewsStore } from "@/store/newsStore";

// 🧹 Helper to prettify category names
function formatCategoryName(category: string): string {
  if (category.toLowerCase() === "more-news") return "Others";

  // Replace underscores/hyphens and capitalize each word
  return category
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function CategorySelect() {
  const {
    categories,
    selectedCategory,
    fetchAllCategories,
    fetchNewsByCategory,
    fetchAllNews,
  } = useNewsStore();

  // ✅ Load categories when component mounts
  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  // ✅ Sort alphabetically but move "more-news" (Others) to the end
  const sortedCategories = useMemo(() => {
    const withoutMoreNews = categories
      .filter((c) => c.toLowerCase() !== "more-news")
      .sort((a, b) => a.localeCompare(b));

    const hasMoreNews = categories.some((c) => c.toLowerCase() === "more-news");
    return hasMoreNews ? [...withoutMoreNews, "more-news"] : withoutMoreNews;
  }, [categories]);

  const handleCategoryChange = (value: string) => {
    if (value === "All") {
      fetchAllNews(); // Reset to all news
    } else {
      fetchNewsByCategory(value);
    }
  };

  return (
    <Select value={selectedCategory || ""} onValueChange={handleCategoryChange}>
      <SelectTrigger
        className="focus:outline-none !ring-0 !border-transparent w-full md:w-[150px]
                        focus:ring-0 focus:border-transparent bg-[#F2E8E8] rounded-[8px] md:text-[14px]"
      >
        <SelectValue placeholder="Select category" />
      </SelectTrigger>

      <SelectContent>
        {/* Always keep All at the top */}
        <SelectItem value="All">All</SelectItem>

        {sortedCategories.map((category) => (
          <SelectItem key={category} value={category}>
            {formatCategoryName(category)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
