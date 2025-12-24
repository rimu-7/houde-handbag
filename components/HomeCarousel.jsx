"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { ArrowRight } from "lucide-react";

const getCarouselData = (dict) => {
  const c = dict?.home?.carousel || {};

  return [
    {
      id: 1,
      url: "https://m.media-amazon.com/images/I/713rpoSFkEL._AC_SY879_.jpg",
      tag: c.slide1?.tag,
      title: c.slide1?.title,
      subtitle: c.slide1?.subtitle,
    },
    {
      id: 2,
      url: "https://images.pexels.com/photos/6088772/pexels-photo-6088772.jpeg",
      tag: c.slide2?.tag,
      title: c.slide2?.title,
      subtitle: c.slide2?.subtitle,
    },
    {
      id: 3,
      url: "https://images.pexels.com/photos/6787035/pexels-photo-6787035.jpeg",
      tag: c.slide3?.tag,
      title: c.slide3?.title,
      subtitle: c.slide3?.subtitle,
    },
    {
      id: 4,
      url: "https://images.pexels.com/photos/4937323/pexels-photo-4937323.jpeg",
      tag: c.slide4?.tag,
      title: c.slide4?.title,
      subtitle: c.slide4?.subtitle,
    },
    {
      id: 5,
      url: "https://images.pexels.com/photos/1883947/pexels-photo-1883947.jpeg",
      tag: c.slide5?.tag,
      title: c.slide5?.title,
      subtitle: c.slide5?.subtitle,
    },
  ];
};

export default function HomeCarousel() {
  const { dict, mounted, t } = useLanguage();
  const [index, setIndex] = useState(0);

  const slides = useMemo(() => getCarouselData(dict), [dict]);

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 2500); // 2.5s for a slightly more relaxed feel
    return () => clearInterval(timer);
  }, [nextSlide]);

  if (!mounted) return <div className="h-screen bg-black" />;

  return (
    <section className="relative h-[85vh] md:h-screen w-full bg-black overflow-hidden">
      {/* 1. Removed mode="wait" to allow slides to overlap during transition (Cross-fade)
          2. initial={false} prevents a blink on the very first page load
      */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          // The cross-fade duration (1.2s) makes it feel premium and smooth
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          {/* Background Image Container */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[index].url})` }}
          >
            {/* Dark gradient overlay stays inside the motion div to fade with the image */}
            <div className="absolute inset-0 bg-black/40 bg-gradient-to-r from-black/90 via-black/20 to-transparent" />
          </div>

          {/* Text Content - Positioned relatively within the absolute motion container */}
          <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-6 md:px-12">
            <div className="max-w-2xl text-white">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase bg-amber-700/80 backdrop-blur-sm rounded"
              >
                {slides[index].tag}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-5xl md:text-8xl font-bold mb-6 leading-[1.1] tracking-tight"
              >
                {slides[index].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-200 mb-10 max-w-lg leading-relaxed"
              >
                {slides[index].subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-full font-bold transition-all hover:gap-4 shadow-xl"
                >
                  {t("Shop Collection", "立即查看系列")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators - Kept outside AnimatePresence so they don't move */}
      <div className="absolute bottom-10 left-12 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="group py-2 focus:outline-none"
          >
            <div
              className={`h-1 rounded-full transition-all duration-500 ${
                index === i
                  ? "w-12 bg-amber-600"
                  : "w-4 bg-white/30 group-hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
