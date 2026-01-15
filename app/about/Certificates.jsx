"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { ZoomIn, X, Minus, Plus, RotateCcw } from "lucide-react";

export default function CertificatesSection({ data, lang }) {
  const [openCert, setOpenCert] = useState(null);
  const [zoom, setZoom] = useState(1);
  const reduceMotion = useReducedMotion();

  const certificates = data?.items ?? [];

  const closeModal = useCallback(() => {
    setOpenCert(null);
    setZoom(1);
  }, []);

  const zoomOut = useCallback(() => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2))), []);
  const zoomIn = useCallback(() => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2))), []);
  const zoomReset = useCallback(() => setZoom(1), []);

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

  useEffect(() => {
    if (!openCert) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [openCert]);

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reduceMotion ? undefined : { duration: 0.6 }}
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            {data.title}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base lg:text-lg">
            {data.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {certificates.map((c, idx) => (
            <motion.button
              key={idx}
              type="button"
              onClick={() => { setOpenCert(c); setZoom(1); }}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={reduceMotion ? undefined : { duration: 0.45, delay: idx * 0.06 }}
              className="group relative w-full overflow-hidden rounded-2xl border border-gray-100 bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 shadow-sm hover:shadow-xl transition"
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl bg-white border border-amber-100">
                <div className="absolute inset-0 p-3 sm:p-4">
                  <CldImage
                    src={c.image}
                    alt="kfjgk"
                    width={1600}
                    height={2200}
                    className="h-full w-full object-contain bg-white rounded-xl"
                  />
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
                  <span className="min-w-0 truncate text-gray-900 text-sm font-semibold drop-shadow-sm bg-white/80 px-2 py-1 rounded">
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

      {/* MODAL */}
      {openCert && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center p-3 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between gap-3 px-4 py-3 border-b bg-white">
                <div>
                  <p className="font-semibold text-gray-900">{openCert.label}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={zoomOut} className="hidden sm:inline-flex p-2 hover:bg-gray-100 rounded-full"><Minus className="w-4 h-4"/></button>
                  <button onClick={zoomIn} className="hidden sm:inline-flex p-2 hover:bg-gray-100 rounded-full"><Plus className="w-4 h-4"/></button>
                  <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5"/></button>
                </div>
              </div>
              {/* Content */}
              <div className="bg-neutral-950/5 relative w-full h-[78vh] flex items-center justify-center overflow-hidden">
                <motion.div animate={{ scale: zoom }} className="p-4">
                  <CldImage
                    src={openCert.image}
                    alt="Certificate"
                    width={1600}
                    height={2200}
                    className="max-h-[70vh] w-auto object-contain shadow-lg"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}