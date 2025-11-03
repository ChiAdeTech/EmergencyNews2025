"use client";
import { useEffect, useRef, useCallback } from "react";
import { MainSelect } from "./MainSelect";
import NewsContent from "./NewsContent";
import { useNewsStore } from "@/store/newsStore";
import { CategorySelect } from "./CategorySelect";
import { TimeFrameSelect } from "./TimeFrameSelect";

export default function Main() {
  const { news, loading, error, fetchAllNews, fetchNextPage, next } = useNewsStore();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  // ✅ Load initial news only once
  useEffect(() => {
    fetchAllNews();
  }, []); // no dependency to avoid refetch loops

  // ✅ Infinite scroll handler (stable with useCallback)
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && next && !loading) {
        fetchNextPage();
      }
    },
    [next, loading, fetchNextPage]
  );

  // ✅ Attach observer to the last item
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
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [handleObserver, news.length]); // only re-run when list size changes

  return (
    <main className="flex-1 h-full md:px-[50px] px-[20px] py-[53px]">
      {/* Header */}
      <header className="flex justify-between mb-[35px] md:flex-row flex-col-reverse gap-y-7">
        <p className="text-[20px] md:text-[28px] font-bold">Live News Feed</p>

        <div className="flex gap-[12.18px] self-end">
          <CategorySelect />
          <TimeFrameSelect />
        </div>
      </header>

      {/* Feed Section */}
      <section className="flex flex-col md:gap-[32px] gap-[45px]">
        {/* Initial states */}
        {loading && news.length === 0 && (
          <p className="text-gray-500">Loading news...</p>
        )}
        {error && <p className="text-red-500">⚠️ {error}</p>}
        {!loading && !error && Array.isArray(news) && news.length === 0 && (
          <p className="text-gray-400">No news articles available.</p>
        )}

        {/* News list */}
        {Array.isArray(news) &&
          news.map((article, index) => {
            const isLast = index === news.length - 1;
            return (
              <div
                key={article.id}
                ref={isLast ? lastElementRef : null}
              >
                <NewsContent article={article} />
              </div>
            );
          })}

        {/* “Loading more” indicator */}
        {loading && news.length > 0 && (
          <p className="text-gray-500 text-center py-4">Loading more news...</p>
        )}
      </section>
    </main>
  );
}
