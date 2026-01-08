"use client";
import { motion, useReducedMotion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { Image as ImageIcon } from "lucide-react";
import { containerVariants, itemVariants } from "./motionVariants";

export default function FacilitiesGallery({ data }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-12 bg-amber-100 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
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

        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          variants={reduceMotion ? undefined : containerVariants}
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
        >
          {data.items.map((item, idx) => (
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
  );
}
