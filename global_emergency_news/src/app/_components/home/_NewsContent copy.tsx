// src/app/_components/home/NewsContent.tsx

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import type { NewsArticle } from "@/service/newsService";

interface NewsContentProps {
  article: NewsArticle;
}

export default function NewsContent({ article }: NewsContentProps) {

  return (
    <article className="flex md:flex-row flex-col-reverse justify-between items-start gap-4">
      <div className="md:w-[60%]">
        <p className="font-semibold text-[16px]">{article.title}</p>
        <p className="text-[#994D4D] text-[14px]">{article.summary}</p>
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline mt-1 block"
        >
          Read more
        </a>
        <p className="text-sm text-gray-500 mt-2">Source: {article.source}</p>
      </div>

      {article.image && (
        <div className="md:w-[35%] w-full">
          <img
            src={article.image}
            alt={article.title}
            className="rounded-md w-full h-full object-cover"
          />
        </div>
      )}
    </article>
  );
}
