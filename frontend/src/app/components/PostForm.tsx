"use client";

import { useState } from "react";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      title,
      body,
      category,
      location,
      image,
      audio,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-[#fff5f5] p-6 rounded-lg shadow-sm border border-[#f5e0de]"
    >
      <h2 className="text-xl font-semibold text-[#3d0c02] mb-2">
        Post Emergency News
      </h2>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-[#f0cfcf] rounded-md px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-300 focus:border-red-300"
        />
      </div>

      {/* Body */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Body
        </label>
        <textarea
          placeholder="Enter news details..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border border-[#f0cfcf] rounded-md px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-300 focus:border-red-300 h-28 resize-none"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category/Tags
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-[#f0cfcf] rounded-md px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-300 focus:border-red-300"
        >
          <option value="">Select</option>
          <option value="flood">Flood</option>
          <option value="earthquake">Earthquake</option>
          <option value="fire">Fire</option>
          <option value="storm">Storm</option>
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-[#f0cfcf] rounded-md px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-300 focus:border-red-300"
        />
      </div>

      {/* Upload Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-[#fce9e9] file:text-gray-700 hover:file:bg-[#fbd5d5] transition"
        />
      </div>

      {/* Upload Audio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Record/Upload Audio
        </label>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudio(e.target.files?.[0] || null)}
          className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-[#fce9e9] file:text-gray-700 hover:file:bg-[#fbd5d5] transition"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-red-500 text-white font-medium py-2 rounded-md hover:bg-red-600 transition"
      >
        Submit
      </button>
    </form>
  );
}
