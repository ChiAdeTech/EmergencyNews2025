// src/app/page.tsx
"use client";

import Navbar from "./components/Navbar";
import PostForm from "./components/PostForm";
import NewsFeed from "./components/NewsFeed";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fff8f7]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
        {/* Left: Post Form */}
        <div className="bg-[#fff5f5] border-r border-gray-200 p-6 rounded-lg shadow-sm">
          <PostForm />
        </div>

        {/* Right: Live Feed */}
        <div>
          <h2 className="text-2xl font-semibold text-[#3d0c02] mb-6">
            Live News Feed
          </h2>
          <NewsFeed />
        </div>
      </div>
    </main>
  );
}
