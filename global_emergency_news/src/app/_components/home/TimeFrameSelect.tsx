"use client";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useNewsStore } from "@/store/newsStore";

// Predefined time frames
const PREDEFINED_TIME_FRAMES = [
  { label: "All Time", value: "all" },
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 Days", value: "last_7_days" },
  { label: "Last 30 Days", value: "last_30_days" },
  { label: "This Month", value: "this_month" },
  { label: "This Year", value: "this_year" },
];

export function TimeFrameSelect() {
  const {
    selectedTimeFrame,
    setTimeFrame,
    selectedCategory,
    fetchAllNews,
    fetchNewsByCategory,
  } = useNewsStore();

  // Dynamic months starting from previous year
  const currentYear = new Date().getFullYear();
  const [monthOptions, setMonthOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const months: { value: string; label: string }[] = [];

    // Start from previous year, show 12 months per year, for last 3 years (optional)
    const yearsToShow = 3;
    for (let y = currentYear - 1; y >= currentYear - yearsToShow; y--) {
      for (let m = 1; m <= 12; m++) {
        const value = `${y}-${m.toString().padStart(2, "0")}`;
        const label = `${new Date(y, m - 1).toLocaleString("default", { month: "long" })} ${y}`;
        months.push({ value, label });
      }
    }

    setMonthOptions(months);
  }, [currentYear]);

  const handleTimeFrameChange = (value: string) => {
    setTimeFrame(value);

    if (value === "all") {
      selectedCategory ? fetchNewsByCategory(selectedCategory) : fetchAllNews();
    } else {
      selectedCategory ? fetchNewsByCategory(selectedCategory, value) : fetchAllNews(value);
    }
  };

  return (
    <Select
      value={selectedTimeFrame || "all"}
      onValueChange={handleTimeFrameChange}
    >
      <SelectTrigger
        className="focus:outline-none !ring-0 !border-transparent w-full md:w-[180px]
                    focus:ring-0 focus:border-transparent bg-[#F2E8E8] rounded-[8px] md:text-[14px]"
      >
        <SelectValue placeholder="Time Frame" />
      </SelectTrigger>

      <SelectContent>
        {/* Predefined options */}
        {PREDEFINED_TIME_FRAMES.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}

        {/* Month options starting from previous year */}
        {monthOptions.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
