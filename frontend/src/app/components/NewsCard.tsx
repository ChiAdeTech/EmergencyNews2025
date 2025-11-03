import { useState } from "react";
import { FALLBACK_NEWS_IMAGE } from "../utils/MyConstants";

export default function NewsCard({ article }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* News Card */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setModalOpen(true);
        }}
        className="block bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition"
      >
        <div className="w-full h-48 bg-gray-200">
          <img
            src={article.image || FALLBACK_NEWS_IMAGE}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_NEWS_IMAGE;
              e.currentTarget.onerror = null;
            }}
          />
        </div>

        <div className="p-4">
          <h2 className="font-semibold text-lg mb-2">{article.title}</h2>
          <p className="text-sm text-gray-600 line-clamp-3">{article.summary}</p>
          <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
            <span>{new Date(article.published).toLocaleString()}</span>
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
              {article.source}
            </span>
          </div>
        </div>
      </a>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg w-11/12 md:w-2/3 max-h-[90vh] overflow-y-auto p-4 relative"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            <button
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
            <img
              src={article.image || FALLBACK_NEWS_IMAGE}
              alt={article.title}
              className="w-full h-64 object-cover rounded mb-4"
              onError={(e) => {
                e.currentTarget.src = FALLBACK_NEWS_IMAGE;
                e.currentTarget.onerror = null;
              }}
            />
            <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
            <p className="text-sm text-gray-500 mb-4">
              {new Date(article.published).toLocaleString()} | {article.source}
            </p>
            <p className="text-gray-700 mb-4">{article.summary}</p>
            <a
              href={article.link}
              target="_blank"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Read Full Article
            </a>
          </div>
        </div>
      )}
    </>
  );
}
