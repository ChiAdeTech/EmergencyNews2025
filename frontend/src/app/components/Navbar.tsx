"use client";

import { Globe } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [language, setLanguage] = useState("English");

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Globe className="text-red-600 w-6 h-6" />
          <span className="font-semibold text-lg text-gray-800">
            Global Emergency News
          </span>
        </div>

        {/* Nav Links + Controls */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-gray-700 hover:text-red-600 font-medium transition"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-red-600 font-medium transition"
          >
            About Us
          </a>

          {/* Language Dropdown */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-400"
          >
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
          </select>

          {/* Profile Icon */}
          <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 0 1 15 0v.75H4.5v-.75Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
