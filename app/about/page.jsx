"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { useLanguage } from "@/components/LanguageProvider";
import { content } from "@/lib/dictionary/aboutData";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  CheckCircle,
  Package,
  ShieldCheck,
  Settings,
  Factory,
  Image as ImageIcon,
  ZoomIn,
  X,
  Minus,
  Plus,
  RotateCcw,
  Building2,
} from "lucide-react";

/* ------------------------------ Motion presets ------------------------------ */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

/* ------------------------------ Counter helpers ----------------------------- */
function parseCounterTarget(target) {
  const raw = String(target ?? "").trim();
  const numMatch = raw.match(/-?\d+(\.\d+)?/);
  const value = numMatch ? parseFloat(numMatch[0]) : 0;

  const hasK = /k/i.test(raw);
  const hasM = /m/i.test(raw);
  const hasPlus = /\+/.test(raw);

  // We only animate the visible number (e.g., "25k+" animates 0→25), then append suffix.
  const suffix = `${hasK ? "k" : ""}${hasM ? "m" : ""}${hasPlus ? "+" : ""}`;

  const hasDecimal = (numMatch?.[0] ?? "").includes(".");
  return { value, suffix, hasDecimal };
}

function formatCounter(n, hasDecimal) {
  if (!Number.isFinite(n)) return "0";
  if (hasDecimal) {
    const rounded = Math.round(n * 10) / 10;
    return rounded.toLocaleString(undefined, { maximumFractionDigits: 1 });
  }
  return Math.round(n).toLocaleString();
}

/** Counter Component (smooth + accurate) */
function AnimatedCounter({ target, duration = 1.8 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();

  const {
    value: targetValue,
    suffix,
    hasDecimal,
  } = useMemo(() => parseCounterTarget(target), [target]);

  useEffect(() => {
    if (!isInView) return;

    if (reduceMotion) {
      setCount(targetValue);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const from = 0;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const next = from + (targetValue - from) * eased;
      setCount(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, targetValue, duration, reduceMotion]);

  return (
    <div
      ref={ref}
      className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-800 mb-2 tabular-nums"
    >
      {formatCounter(count, hasDecimal)}
      {suffix}
    </div>
  );
}

/* ---------------------------------- Page ---------------------------------- */
export default function AboutPage() {
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();

  const currentContent = useMemo(() => content?.[lang] ?? content.en, [lang]);
  const certificates = useMemo(
    () => currentContent?.sections?.certificates?.items ?? [],
    [currentContent]
  );

  const [openCert, setOpenCert] = useState(null);
  const [zoom, setZoom] = useState(1);

  const closeModal = useCallback(() => {
    setOpenCert(null);
    setZoom(1);
  }, []);

  const zoomOut = useCallback(
    () => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2))),
    []
  );
  const zoomIn = useCallback(
    () => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2))),
    []
  );
  const zoomReset = useCallback(() => setZoom(1), []);

  // ESC to close
  useEffect(() => {
    if (!openCert) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-" || e.key === "_") zoomOut();
      if (e.key.toLowerCase() === "r") zoomReset();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openCert, closeModal, zoomIn, zoomOut, zoomReset]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!openCert) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openCert]);

  const mv = (variants) =>
    reduceMotion
      ? {
          initial: false,
          animate: false,
          whileInView: false,
          variants: undefined,
        }
      : {
          initial: "hidden",
          whileInView: "visible",
          variants,
          viewport: { once: true, amount: 0.25 },
        };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {/* Hero */}
      <section className="relative py-12 md:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-50" />
        <div className="absolute inset-0 opacity-[0.25] [background-image:radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? undefined : "visible"}
              variants={reduceMotion ? undefined : containerVariants}
              className="space-y-4 md:space-y-6"
            >
              <motion.div variants={reduceMotion ? undefined : itemVariants}>
                <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-800/90">
                  <span className="h-2 w-2 rounded-full bg-amber-700" />
                  {lang === "en" ? "Company Overview" : "公司介绍"}
                </p>
              </motion.div>

              <motion.div variants={reduceMotion ? undefined : itemVariants}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                  {currentContent.title}
                </h1>
              </motion.div>

              <motion.div variants={reduceMotion ? undefined : itemVariants}>
                <p className="text-lg md:text-xl text-amber-800 font-semibold">
                  {currentContent.subtitle}
                </p>
              </motion.div>

              <motion.div variants={reduceMotion ? undefined : itemVariants}>
                <p className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed">
                  {currentContent.heroDescription}
                </p>
              </motion.div>

              <motion.div
                variants={reduceMotion ? undefined : itemVariants}
                className="flex flex-wrap gap-3"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-amber-800 px-6 py-3 text-sm md:text-base font-semibold text-white hover:bg-amber-700 transition shadow-sm hover:shadow-md"
                >
                  {lang === "en" ? "Contact Us" : "联系我们"}
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-full border border-amber-200 bg-white px-6 py-3 text-sm md:text-base font-semibold text-amber-900 hover:bg-amber-50 transition"
                >
                  {lang === "en" ? "View Products" : "查看产品"}
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={
                reduceMotion ? false : { opacity: 0, scale: 0.9, rotate: -3 }
              }
              animate={
                reduceMotion ? undefined : { opacity: 1, scale: 1, rotate: 0 }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 0.8,
                      type: "spring",
                      stiffness: 90,
                      damping: 14,
                    }
              }
              className="relative h-56 sm:h-72 md:h-80 lg:h-96 rounded-2xl lg:rounded-3xl overflow-hidden border border-amber-200/60 bg-white shadow-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-700 via-amber-600 to-amber-800" />
              <div className="relative h-full w-full flex items-center justify-center p-4">
                <CldImage
                  src="https://res.cloudinary.com/drnascc38/image/upload/v1766143823/Picsart_25-12-19_19-29-08-105_cv6vbp.png"
                  alt="hero"
                  width={1600}
                  height={2200}
                  className="h-full w-full object-contain rounded-xl bg-white shadow-lg"
                  sizes="(max-width: 768px) 92vw, 1000px"
                  quality="auto"
                  format="auto"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto lg:py-20">
        {/* Two Companies (shown early) */}
        {currentContent?.companies?.items?.length >= 2 && (
          <motion.div variants={itemVariants} className="pt-2">
            <div className="rounded-2xl border border-amber-200/70 bg-white/70 backdrop-blur px-4 py-4 md:px-5 md:py-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-900">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-50 border border-amber-200">
                  <Building2 className="h-4 w-4 text-amber-800" />
                </span>
                <span>{currentContent.companies.eyebrow}</span>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {currentContent.companies.items.slice(0, 2).map((co, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 hover:bg-gray-50 transition"
                  >
                    <p className="font-semibold text-gray-900 text-sm sm:text-base leading-snug">
                      {co.name}
                    </p>
                    <p className="mt-1 inline-flex w-fit rounded-full bg-amber-50 px-2.5 py-1 text-[11px] sm:text-xs font-semibold text-amber-900 border border-amber-100">
                      {co.role}
                    </p>
                    <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {co.blurb}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* Our Story & Mission */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            <motion.div
              {...mv(slideInLeft)}
              className="bg-gray-100 p-6 md:p-8 lg:p-10 rounded-2xl lg:rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow"
            >
              <motion.h2
                variants={reduceMotion ? undefined : itemVariants}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6"
              >
                {currentContent.sections.story.title}
              </motion.h2>

              <motion.p
                variants={reduceMotion ? undefined : itemVariants}
                className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg leading-relaxed"
              >
                {currentContent.sections.story.description}
              </motion.p>

              <motion.ul
                variants={reduceMotion ? undefined : containerVariants}
                className="space-y-3 md:space-y-4"
              >
                {currentContent.sections.story.points.map((point, index) => (
                  <motion.li
                    key={index}
                    variants={reduceMotion ? undefined : itemVariants}
                    className="flex items-start group"
                  >
                    <div className="w-5 h-5 md:w-6 md:h-6 text-amber-800 mr-3 mt-1 flex-shrink-0">
                      <CheckCircle className="w-full h-full" />
                    </div>
                    <span className="text-gray-700 text-sm md:text-base group-hover:text-amber-800 transition-colors">
                      {point}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              {...mv(slideInRight)}
              className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 md:p-8 lg:p-10 rounded-2xl lg:rounded-3xl border border-amber-200 shadow-sm hover:shadow-xl transition-shadow"
            >
              <motion.h2
                variants={reduceMotion ? undefined : itemVariants}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6"
              >
                {currentContent.sections.mission.title}
              </motion.h2>

              <motion.p
                variants={reduceMotion ? undefined : itemVariants}
                className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg leading-relaxed"
              >
                {currentContent.sections.mission.description}
              </motion.p>

              <motion.ul
                variants={reduceMotion ? undefined : containerVariants}
                className="space-y-3 md:space-y-4"
              >
                {currentContent.sections.mission.points.map((point, index) => (
                  <motion.li
                    key={index}
                    variants={reduceMotion ? undefined : itemVariants}
                    className="flex items-start group"
                  >
                    <div className="w-5 h-5 md:w-6 md:h-6 text-amber-800 mr-3 mt-1 flex-shrink-0">
                      <CheckCircle className="w-full h-full" />
                    </div>
                    <span className="text-gray-700 text-sm md:text-base group-hover:text-amber-800 transition-colors">
                      {point}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.6 }}
            viewport={{ once: true, amount: 0.25 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              {currentContent.sections.certificates.title}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base lg:text-lg">
              {currentContent.sections.certificates.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {certificates.map((c, idx) => (
              <motion.button
                key={idx}
                type="button"
                onClick={() => {
                  setOpenCert(c);
                  setZoom(1);
                }}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 0.45, delay: idx * 0.06 }
                }
                className="group relative w-full overflow-hidden rounded-2xl border border-gray-100 bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 shadow-sm hover:shadow-xl transition"
                aria-label={`Open certificate: ${c.label}`}
              >
                <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl bg-white border border-amber-100">
                  <div className="absolute inset-0 p-3 sm:p-4">
                    <CldImage
                      src={c.image}
                      alt={c.label}
                      width={1600}
                      height={2200}
                      className="h-full w-full object-contain bg-white rounded-xl"
                      sizes="(max-width: 768px) 92vw, 1000px"
                      quality="auto"
                      format="auto"
                    />
                  </div>

                  {/* Better readability for label on any certificate background */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
                    <span className="min-w-0 truncate text-white text-sm font-semibold drop-shadow">
                      {c.label}
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-white/60">
                      <ZoomIn className="h-4 w-4 text-amber-800" />
                      {lang === "en" ? "View" : "查看"}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Fullscreen modal */}
        {openCert && (
          <div
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label="Certificate preview"
          >
            <motion.div
              initial={
                reduceMotion ? false : { opacity: 0, scale: 0.98, y: 10 }
              }
              animate={
                reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }
              }
              transition={
                reduceMotion ? undefined : { duration: 0.22, ease: "easeOut" }
              }
              className="absolute inset-0 flex items-center justify-center p-3 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b bg-white">
                  <div className="min-w-0">
                    <p className="truncate text-sm sm:text-base font-semibold text-gray-900">
                      {openCert.label}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {lang === "en"
                        ? "ESC to close • +/- to zoom • R to reset"
                        : "按 ESC 关闭 • +/- 缩放 • R 重置"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={zoomOut}
                      className="hidden sm:inline-flex items-center gap-2 rounded-full border bg-white px-3 py-2 text-xs font-semibold hover:bg-gray-50"
                    >
                      <Minus className="h-4 w-4" />
                      {lang === "en" ? "Zoom" : "缩小"}
                    </button>
                    <button
                      onClick={zoomIn}
                      className="hidden sm:inline-flex items-center gap-2 rounded-full border bg-white px-3 py-2 text-xs font-semibold hover:bg-gray-50"
                    >
                      <Plus className="h-4 w-4" />
                      {lang === "en" ? "Zoom" : "放大"}
                    </button>
                    <button
                      onClick={zoomReset}
                      className="hidden sm:inline-flex items-center gap-2 rounded-full border bg-white px-3 py-2 text-xs font-semibold hover:bg-gray-50"
                    >
                      <RotateCcw className="h-4 w-4" />
                      {lang === "en" ? "Reset" : "重置"}
                    </button>

                    <div className="hidden sm:flex items-center rounded-full bg-amber-50 border border-amber-100 px-3 py-2 text-xs font-semibold text-amber-900">
                      {Math.round(zoom * 100)}%
                    </div>

                    <button
                      onClick={closeModal}
                      className="inline-flex items-center justify-center rounded-full border bg-white p-2 hover:bg-gray-50"
                      aria-label="Close"
                    >
                      <X className="h-5 w-5 text-gray-700" />
                    </button>
                  </div>
                </div>

                <div className="bg-neutral-950/5">
                  <div
                    className={`relative w-full h-[78vh] sm:h-[82vh] flex items-center justify-center ${
                      zoom > 1 ? "overflow-auto" : "overflow-hidden"
                    }`}
                  >
                    <motion.div
                      className="p-4 sm:p-6"
                      animate={reduceMotion ? undefined : { scale: zoom }}
                      transition={
                        reduceMotion
                          ? undefined
                          : { type: "spring", stiffness: 160, damping: 20 }
                      }
                      style={{ transformOrigin: "center center" }}
                    >
                      <div className="relative max-w-[92vw] sm:max-w-[1000px]">
                        <CldImage
                          src={openCert.image}
                          alt={openCert.label}
                          width={1600}
                          height={2200}
                          className="w-auto max-w-full h-auto max-h-[72vh] object-contain rounded-xl bg-white shadow-lg border"
                          sizes="(max-width: 768px) 92vw, 1000px"
                          quality="auto"
                          format="auto"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Mobile controls */}
                  <div className="sm:hidden border-t bg-white px-4 py-3 flex items-center justify-between">
                    <button
                      onClick={zoomOut}
                      className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold"
                    >
                      <Minus className="h-4 w-4" />
                      {lang === "en" ? "Zoom" : "缩小"}
                    </button>

                    <button
                      onClick={zoomReset}
                      className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold"
                    >
                      <RotateCcw className="h-4 w-4" />
                      {lang === "en" ? "Reset" : "重置"}
                    </button>

                    <button
                      onClick={zoomIn}
                      className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold"
                    >
                      <Plus className="h-4 w-4" />
                      {lang === "en" ? "Zoom" : "放大"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </section>

      {/* Values */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 26 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.6 }}
            viewport={{ once: true, amount: 0.25 }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              {currentContent.sections.values.title}
            </h2>
            <p className="text-gray-600 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto text-sm md:text-base lg:text-lg">
              {lang === "en"
                ? "The principles that guide everything we do"
                : "指导我们一切行动的原则"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {currentContent.sections.values.items.map((value, index) => (
              <motion.div
                key={index}
                initial={reduceMotion ? false : "hidden"}
                whileInView={reduceMotion ? undefined : "visible"}
                variants={reduceMotion ? undefined : scaleIn}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 0.5, delay: index * 0.05 }
                }
                viewport={{ once: true, amount: 0.12 }}
                className="bg-gray-100 p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group"
              >
                <div className="text-amber-800 mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 md:mb-3 group-hover:text-amber-800 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Photo Grid */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.6 }}
            viewport={{ once: true, amount: 0.25 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              {currentContent.sections.facilities.title}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base lg:text-lg">
              {currentContent.sections.facilities.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            variants={reduceMotion ? undefined : containerVariants}
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
          >
            {currentContent.sections.facilities.items.map((item, idx) => (
              <motion.div
                key={idx}
                variants={reduceMotion ? undefined : itemVariants}
                className="group rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[4/3] bg-gray-100">
                  <CldImage
                    src={item.image}
                    alt={item.label}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center rounded-lg bg-white/90 px-2 py-1 text-xs font-semibold text-gray-900">
                      <ImageIcon className="h-3.5 w-3.5 mr-1 text-amber-800" />
                      {item.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.6 }}
            viewport={{ once: true, amount: 0.25 }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              {currentContent.sections.capabilities.title}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base lg:text-lg">
              {currentContent.sections.capabilities.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {currentContent.sections.capabilities.items.map((item, index) => (
              <motion.div
                key={index}
                initial={reduceMotion ? false : "hidden"}
                whileInView={reduceMotion ? undefined : "visible"}
                variants={reduceMotion ? undefined : scaleIn}
                viewport={{ once: true, amount: 0.25 }}
                className="bg-amber-50 p-4 md:p-6 rounded-xl lg:rounded-2xl text-center border border-amber-100 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                <div className="min-h-[56px] md:min-h-[70px] flex items-center justify-center">
                  <AnimatedCounter
                    target={item.value}
                    duration={1.8 + index * 0.2}
                  />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                  {item.unit}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Testing */}
      <section className="py-12 md:py-16 lg:py-20 bg-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.6 }}
            viewport={{ once: true, amount: 0.25 }}
            className="text-center mb-10 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              {currentContent.sections.testing.title}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base lg:text-lg">
              {currentContent.sections.testing.description}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
            {/* Left */}
            <motion.div
              {...mv(slideInLeft)}
              className="bg-white rounded-2xl border border-amber-100 p-5 sm:p-6 lg:p-8 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-5 w-5 text-amber-800" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {currentContent.sections.testing.subTitle}
                </h3>
              </div>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {currentContent.sections.testing.shortLine}
              </p>

              <div className="mt-5 space-y-3">
                {currentContent.sections.testing.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 text-amber-800">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base">{h}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl overflow-hidden border border-amber-100 bg-gray-50">
                <CldImage
                  src={currentContent.sections.testing.machineImage}
                  alt="Testing machine"
                  width={1200}
                  height={900}
                  className="w-full h-56 sm:h-64 object-cover"
                  sizes="(max-width: 768px) 92vw, 700px"
                  quality="auto"
                  format="auto"
                />
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              {...mv(slideInRight)}
              className="bg-white rounded-2xl border border-amber-100 p-5 sm:p-6 lg:p-8 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <Settings className="h-5 w-5 text-amber-800" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {currentContent.sections.testing.tableTitle}
                </h3>
              </div>

              <div className="w-full max-w-full overflow-x-auto rounded-xl border border-amber-100 bg-white">
                <table className="w-full table-fixed text-left">
                  <colgroup>
                    <col className="w-[72px]" />
                    <col className="w-[44%]" />
                    <col className="w-[56%]" />
                  </colgroup>

                  <thead>
                    <tr className="border-b bg-amber-50">
                      {currentContent.sections.testing.tableHeaders.map(
                        (h, i) => (
                          <th
                            key={i}
                            className="py-3 px-3 text-xs sm:text-sm font-semibold text-gray-900"
                          >
                            {h}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {currentContent.sections.testing.tests.map((row, i) => (
                      <tr
                        key={i}
                        className="border-b last:border-b-0 hover:bg-amber-50/40"
                      >
                        <td className="py-3 px-3 text-xs sm:text-sm text-gray-700 align-top">
                          {row.no}
                        </td>
                        <td className="py-3 px-3 text-xs sm:text-sm text-gray-700 align-top max-w-0 break-words whitespace-normal">
                          {row.item}
                        </td>
                        <td className="py-3 px-3 text-xs sm:text-sm text-gray-700 align-top max-w-0 break-words whitespace-normal">
                          {row.equipment}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 grid sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Factory className="h-4 w-4 text-amber-800" />
                    <p className="font-semibold text-gray-900 text-sm">
                      {currentContent.sections.testing.badge1Title}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {currentContent.sections.testing.badge1Desc}
                  </p>
                </div>

                <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-4 w-4 text-amber-800" />
                    <p className="font-semibold text-gray-900 text-sm">
                      {currentContent.sections.testing.badge2Title}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {currentContent.sections.testing.badge2Desc}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Materials & Product Range */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.6 }}
            viewport={{ once: true, amount: 0.25 }}
            className="text-center mb-10 md:mb-14"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              {currentContent.sections.materials.title}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base lg:text-lg">
              {currentContent.sections.materials.description}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <motion.div
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              variants={reduceMotion ? undefined : scaleIn}
              viewport={{ once: true, amount: 0.2 }}
              className="lg:col-span-2 bg-gray-100 rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-5 w-5 text-amber-800" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {currentContent.sections.materials.rangeTitle}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {currentContent.sections.materials.productRange.map((x, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-white px-3 py-1 text-xs sm:text-sm border text-gray-800"
                  >
                    {x}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 mb-4">
                <CheckCircle className="h-5 w-5 text-amber-800" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {currentContent.sections.materials.materialTitle}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {currentContent.sections.materials.materialsUsed.map((x, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-amber-50 px-3 py-1 text-xs sm:text-sm border border-amber-100 text-gray-800"
                  >
                    {x}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              variants={reduceMotion ? undefined : scaleIn}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 md:p-8 border border-amber-200 shadow-sm"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                {currentContent.sections.materials.systemTitle}
              </h3>

              <div className="space-y-3">
                {currentContent.sections.materials.systems.map((x, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-800 mt-0.5" />
                    <p className="text-gray-700 text-sm sm:text-base">{x}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl bg-white/70 border p-4">
                <p className="text-sm sm:text-base text-gray-800 font-semibold">
                  {currentContent.sections.materials.certificationTitle}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {currentContent.sections.materials.certificationDesc}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="py-12 md:py-16 lg:py-20 bg-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.6 }}
            viewport={{ once: true, amount: 0.25 }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              {currentContent.sections.process.title}
            </h2>
            <p className="text-gray-600 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto text-sm md:text-base lg:text-lg">
              {lang === "en"
                ? "From concept to creation, our meticulous process ensures excellence"
                : "从概念到成品，我们严谨的流程确保卓越品质"}
            </p>
          </motion.div>

          <div className="relative">
            {!reduceMotion && (
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.3, delay: 0.25 }}
                viewport={{ once: true }}
                className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 transform -translate-y-1/2 origin-left"
              />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {currentContent.sections.process.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={reduceMotion ? false : "hidden"}
                  whileInView={reduceMotion ? undefined : "visible"}
                  variants={reduceMotion ? undefined : itemVariants}
                  viewport={{ once: true, amount: 0.25 }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { y: -8, transition: { duration: 0.2 } }
                  }
                  className="relative"
                >
                  <div className="bg-gray-100 p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 h-full relative z-10">
                    <div className="text-3xl md:text-4xl font-bold text-amber-800 mb-3 md:mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 md:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      {step.description}
                    </p>
                  </div>

                  {index < currentContent.sections.process.steps.length - 1 && (
                    <>
                      <div className="block sm:hidden absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-1 h-6 bg-amber-200" />
                      <div className="hidden sm:block lg:hidden absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-6 h-1 bg-amber-200" />
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 0.6, type: "spring", stiffness: 100, damping: 15 }
            }
            viewport={{ once: true, amount: 0.25 }}
            className="relative bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 text-center text-white overflow-hidden shadow-sm"
          >
            {!reduceMotion && (
              <>
                <motion.div
                  animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"
                />
                <motion.div
                  animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"
                />
              </>
            )}

            <div className="relative z-10">
              <motion.h2
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={reduceMotion ? undefined : { duration: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4"
              >
                {currentContent.cta.title}
              </motion.h2>

              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={
                  reduceMotion ? undefined : { duration: 0.5, delay: 0.1 }
                }
                viewport={{ once: true }}
                className="text-amber-100 text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-2xl mx-auto"
              >
                {currentContent.cta.description}
              </motion.p>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-amber-800 hover:bg-amber-50 px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:shadow-2xl"
              >
                {currentContent.cta.button}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
