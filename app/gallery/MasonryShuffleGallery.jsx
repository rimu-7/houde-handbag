"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const ITEMS_PER_PAGE = 20;

export const MasonryShuffleGallery = ({ items }) => {
  const [shuffledItems, setShuffledItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef(null);

  // Shuffle on mount
  useEffect(() => {
    setShuffledItems(shuffleArray(items));
  }, [items]);

  // Scroll to top when page changes
  useEffect(() => {
    if (currentPage > 1 && topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);

  if (shuffledItems.length === 0) return null;

  // Pagination Logic
  const totalPages = Math.ceil(shuffledItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = shuffledItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const { lang, toggleLang } = useLanguage();

  return (
    <div className="p-4 md:p-8" ref={topRef}>
      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 min-h-[500px]">
        <AnimatePresence mode="wait">
          {currentItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="relative group break-inside-avoid overflow-hidden rounded-xl bg-neutral-900"
            >
              <Image
                src={item.url}
                alt={item.name}
                width={500}
                height={500}
                // Important: Prevents the Timeout Error by bypassing server optimization
                unoptimized={true}
                className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 items-center justify-center backdrop-blur-[2px]">
                <span className="text-white font-medium text-lg tracking-wide border border-white/20 bg-white/10 px-4 py-2 rounded-full">
                  {/* {item.name} */}
                  {lang === "en" ? item.name : item.namecn}
                </span>
                {/* <span className="text-white/70 text-sm">
                  ID: {item.id}
                </span> */}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Page Numbers */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-full font-medium transition ${
                  currentPage === page
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
