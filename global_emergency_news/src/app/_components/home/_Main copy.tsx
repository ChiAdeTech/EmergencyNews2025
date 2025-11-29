"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import { MainSelect } from "./MainSelect";
import NewsContent from "./NewsContent";
import { useNewsStore } from "@/store/newsStore";
import { CategorySelect } from "./CategorySelect";
import { TimeFrameSelect } from "./TimeFrameSelect";
import { fetchRegions, fetchCountries } from "@/service/newsService";

export default function Main() {
  const {
    news,
    loading,
    error,
    fetchAllNews,
    fetchNextPage,
    next,
    selectedCategory,
    selectedTimeFrame,
    setTimeFrame,
    clearFilters,
  } = useNewsStore();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  // Local state for regions/countries
  const [regions, setRegions] = useState<{ id: number; name: string }[]>([]);
  const [countries, setCountries] = useState<{ id: number; name: string; region_id: number }[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null);

  // Load initial news + regions/countries
  useEffect(() => {
    fetchAllNews();

    const loadRegions = async () => {
      const data = await fetchRegions();
      setRegions(data);
    };
    const loadCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
    };

    loadRegions();
    loadCountries();
  }, []);

  // Infinite scroll handler
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && next && !loading) {
        fetchNextPage();
      }
    },
    [next, loading, fetchNextPage]
  );

  useEffect(() => {
    if (!lastElementRef.current) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "200px",
      threshold: 0.1,
    });

    observerRef.current.observe(lastElementRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [handleObserver, news.length]);

  // Filter countries based on selected region
  const filteredCountries = selectedRegion
    ? countries.filter((c) => c.region_id === selectedRegion)
    : countries;

  return (
    <main className="flex-1 h-full md:px-[50px] px-[20px] py-[53px]">
      {/* Header */}
      <header className="flex justify-between mb-[35px] md:flex-row flex-col-reverse gap-y-7">
        <p className="text-[20px] md:text-[28px] font-bold">Live News Feed</p>

        <div className="flex gap-[12.18px] self-end flex-wrap">
          <CategorySelect />
          <TimeFrameSelect />

          {/* Region select */}
          <MainSelect
            addClass=""
            label="Region"
            options={regions.map((r) => ({ value: r.id, label: r.name }))}
            value={selectedRegion ?? ""}
            onChange={(val) => {
              const regionId = Number(val) || null;
              setSelectedRegion(regionId);
              setSelectedCountry(null);

              fetchAllNews({
                timeFrame: selectedTimeFrame || undefined,
                category: selectedCategory || undefined,
                region: regionId ?? undefined, // send ID
                country: undefined,
              });
            }}
          />

          {/* Country select */}
          <MainSelect
            addClass=""
            label="Country"
            options={filteredCountries.map((c) => ({ value: c.id, label: c.name }))}
            value={selectedCountry ?? ""}
            onChange={(val) => {
              const countryId = Number(val) || null;
              setSelectedCountry(countryId);

              fetchAllNews({
                timeFrame: selectedTimeFrame || undefined,
                category: selectedCategory || undefined,
                region: selectedRegion ?? undefined,
                country: countryId ?? undefined, // send ID
              });
            }}
          />
        </div>
      </header>

      {/* Feed Section */}
      <section className="flex flex-col md:gap-[32px] gap-[45px]">
        {loading && news.length === 0 && <p className="text-gray-500">Loading news...</p>}
        {error && <p className="text-red-500">⚠️ {error}</p>}
        {!loading && !error && news.length === 0 && (
          <p className="text-gray-400">No news articles available.</p>
        )}

        {news.map((article, index) => {
          const isLast = index === news.length - 1;
          return (
            <div key={article.id} ref={isLast ? lastElementRef : null}>
              <NewsContent article={article} />
            </div>
          );
        })}

        {loading && news.length > 0 && (
          <p className="text-gray-500 text-center py-4">Loading more news...</p>
        )}
      </section>
    </main>
  );
}
