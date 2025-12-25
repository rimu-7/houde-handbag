"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Banner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPermanent, setPermanent] = useState(false);

  useEffect(() => {
    // Check if this is first visit (no localStorage) OR page refresh
    const hasVisited = localStorage.getItem("hasVisited");
    const navigationEntries = performance.getEntriesByType("navigation");
    const wasRefreshed = navigationEntries.length > 0 && 
                       (navigationEntries[0].type === "reload" || 
                        navigationEntries[0].type === "navigate");

    // Show on first visit OR refresh
    if (!hasVisited || wasRefreshed) {
      setIsVisible(true);
      localStorage.setItem("hasVisited", "true");
      setPermanent(!hasVisited); // Permanent close only on first visit
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className=" bg-gradient-to-r from-amber-500 to-amber-600 text-white overflow-hidden sticky top-0 z-50"
        >
          <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <div className="flex-shrink-0 mr-3">
                  <span className="text-lg">🎁</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Special offer for {isPermanent ? "first-time" : "returning"} visitors!{" "}
                    <span className="font-bold">Get 10% OFF</span> your first purchase.
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleClose}
                className="ml-4 flex-shrink-0 rounded-full p-1 hover:bg-white/20 transition-colors"
                aria-label="Close banner"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Banner;