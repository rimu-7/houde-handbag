"use client";

import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import {
  getCurrentYear,
  homeData,
  homeImages,
} from "@/lib/dictionary/homeData";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import TestimonialsCarousel from "./Testimonials";
import HomeCarousel from "./HomeCarousel";

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const slideInFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "backOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// --- Main Component ---
export default function Hero() {
  const { lang } = useLanguage();
  // Safe access to data in case lang is undefined or loading
  const data = homeData[lang] || homeData["en"];

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Exquisite Leather Goods | Luxury Bag Manufacturer</title>
        <meta
          name="description"
          content="Handcrafted luxury leather bags and accessories, blending traditional craftsmanship with modern design"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      {/* <HeroSection data={data.hero} /> */}
      <HomeCarousel />

      {/* Content Sections */}
      <HeroContents sections={data.sections} />

      {/* Achievements Section */}
      <HeroAchievements data={data.achievements} />

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* Product Categories Section */}
      <HeroProductCategory data={data.productCategories} />
    </div>
  );
}

// --- Sub-Components ---

const HeroSection = ({ data }) => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });

  // Scroll-based animations for Hero
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="relative h-screen overflow-hidden" ref={heroRef}>
      <motion.div
        className="absolute inset-0"
        style={{ scale: heroScale, opacity: heroOpacity }}
      >
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={homeImages.heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <AnimatePresence>
          {isHeroInView && (
            <>
              <motion.h1
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="text-4xl md:text-7xl font-bold mb-6"
              >
                {data.title}
              </motion.h1>
              <motion.p
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl max-w-3xl mb-8"
              >
                {data.subtitle}
              </motion.p>
              <Link href={"/products"}>
                <motion.button
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-amber-800 hover:bg-amber-900 text-white font-semibold py-3 px-8 rounded-full text-lg transition-colors duration-300"
                >
                  {data.cta}
                </motion.button>
              </Link>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const HeroContents = ({ sections }) => {
  return (
    <div>
      {sections.map((section, index) => (
        <ContentSection key={index} section={section} index={index} />
      ))}
    </div>
  );
};

// Helper component to handle individual section view logic
const ContentSection = ({ section, index }) => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const isEven = index % 2 === 0;

  // --- Blur placeholder (no network request) ---
  const shimmer = (w, h) => `
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g">
            <stop stop-color="#f3f4f6" offset="0%" />
            <stop stop-color="#e5e7eb" offset="50%" />
            <stop stop-color="#f3f4f6" offset="100%" />
          </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="#f3f4f6"/>
        <rect id="r" width="${w}" height="${h}" fill="url(#g)"/>
        <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite" />
      </svg>
    `;

  const toBase64 = (str) => {
    if (typeof window === "undefined")
      return Buffer.from(str).toString("base64");
    return window.btoa(str);
  };

  const shimmerDataUrl = (w, h) =>
    `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;

  // Cloudinary URL -> public_id
  const cloudinaryPublicId = (src) => {
    if (!src) return src;
    if (!src.includes("/upload/")) return src;

    let after = src.split("/upload/")[1] || "";
    after = after.split("?")[0];

    // handle transformations by cutting to version if exists
    const vIndex = after.search(/v\d+\//);
    if (vIndex >= 0) after = after.slice(vIndex);
    after = after.replace(/^v\d+\//, "");
    after = after.replace(/\.[a-z0-9]+$/i, "");

    return after;
  };

  return (
    <section
      ref={sectionRef}
      className={`py-12 sm:py-14 md:py-20 ${
        !isEven ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div
          className={`flex flex-col ${
            !isEven ? "md:flex-row-reverse" : "md:flex-row"
          } items-start md:items-center gap-8 sm:gap-10 md:gap-12`}
        >
          <AnimatePresence>
            {isSectionInView && (
              <>
                {/* TEXT */}
                <motion.div
                  className="w-full md:w-1/2"
                  initial="hidden"
                  animate="visible"
                  variants={isEven ? slideInFromLeft : slideInFromRight}
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-5 md:mb-6 leading-tight">
                    {section.title}
                  </h2>

                  <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                    {section.description}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-6 sm:mt-7 md:mt-8 inline-flex items-center justify-center border-2 border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white font-semibold py-2.5 px-6 sm:px-7 rounded-full transition-colors duration-300 w-full sm:w-auto"
                  >
                    {section.cta}
                  </motion.button>
                </motion.div>

                {/* IMAGE - FIXED */}
                <motion.div
                  className="w-full md:w-1/2 hover:shadow-xl hover:shadow-amber-800 hover:rounded-b-2xl"
                  initial="hidden"
                  animate="visible"
                  variants={isEven ? slideInFromRight : slideInFromLeft}
                >
                  <div className="relative pb-[75%] rounded-2xl overflow-hidden">
                    {" "}
                    <CldImage
                      src={cloudinaryPublicId(homeImages.sectionImages[index])}
                      alt={section.title}
                      fill
                      className="w-full h-full object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality="auto"
                      format="auto"
                      placeholder="blur"
                      blurDataURL={shimmerDataUrl(1200, 800)}
                      priority={index === 0}
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const HeroAchievements = ({ data }) => {
  const achievementsRef = useRef(null);
  const isAchievementsInView = useInView(achievementsRef, {
    once: true,
    amount: 0.3,
  });

  const [yearsCount, setYearsCount] = useState(0);
  const [countriesCount, setCountriesCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    if (isAchievementsInView) {
      // Helper to animate numbers
      const animateValue = (setFn, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          setFn(Math.floor(progress * end));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      };

      animateValue(setYearsCount, 500, 2000);
      animateValue(setCountriesCount, 50, 1500);
      animateValue(setProductsCount, 1000, 2500);
    }
  }, [isAchievementsInView]);

  return (
    <section className="py-20 bg-amber-900 text-white" ref={achievementsRef}>
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          initial="hidden"
          animate={isAchievementsInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-4xl font-bold mb-12"
        >
          {data.title}
        </motion.h2>
        <motion.div
          initial="hidden"
          animate={isAchievementsInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {data.stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemAnimation}
              className="space-y-4"
            >
              <div className="text-6xl font-bold">
                {index === 0 && yearsCount.toLocaleString()}
                {index === 1 && countriesCount.toLocaleString()}
                {index === 2 && productsCount.toLocaleString()}
                {/* Fallback if logic index doesn't match */}
                {/* You might want to map these explicitly based on your data structure */}
              </div>
              <p className="text-xl">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const HeroProductCategory = ({ data }) => {
  const categoryRef = useRef(null);
  const isCategoryInView = useInView(categoryRef, { once: true, amount: 0.3 });

  // --- Blur placeholder (no network request) ---
  const shimmer = (w, h) => `
    <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="g">
        <stop stop-color="#f3f4f6" offset="0%" />
        <stop stop-color="#e5e7eb" offset="50%" />
        <stop stop-color="#f3f4f6" offset="100%" />
        </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#f3f4f6"/>
    <rect id="r" width="${w}" height="${h}" fill="url(#g)"/>
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite" />
    </svg>
    `;

  const toBase64 = (str) => {
    // client-safe base64
    if (typeof window === "undefined")
      return Buffer.from(str).toString("base64");
    return window.btoa(str);
  };

  const shimmerDataUrl = (w, h) =>
    `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;

  // Optional: if your src is a Cloudinary URL, convert it to publicId so transformations work reliably
  const cloudinaryPublicId = (src) => {
    if (!src) return src;
    if (!src.includes("/upload/")) return src; // already public_id
    let after = src.split("/upload/")[1];
    after = after.replace(/^v\d+\//, ""); // remove version
    after = after.split("?")[0]; // remove query
    after = after.replace(/\.[a-z0-9]+$/i, ""); // remove extension
    return after;
  };

  return (
    <section className="py-20 bg-white" ref={categoryRef}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial="hidden"
          animate={isCategoryInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-4xl font-bold text-center text-gray-800 mb-16"
        >
          {data.title}
        </motion.h2>
        <motion.div
          initial="hidden"
          animate={isCategoryInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {data.categories.map((category, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="group cursor-pointer text-center hover:shadow-xl hover:shadow-amber-800 hover:rounded-b-2xl"
            >
              <div className="relative overflow-hidden rounded-xl mb-4">
                <div className="relative pb-[75%] rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <CldImage
                      src={homeImages.categoryImages[index]}
                      alt={category.name}
                      fill
                      className="!relative !w-auto !h-auto max-w-full max-h-full object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality="auto"
                      format="auto"
                      placeholder="blur"
                      blurDataURL={shimmerDataUrl(1200, 800)}
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {category.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
