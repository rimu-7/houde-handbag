"use client";

import React from "react";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import Image from "next/image";

const productImages = [
  "https://m.media-amazon.com/images/I/51UImKMD48L._AC_.jpg",
  "https://m.media-amazon.com/images/I/71fYzje3qGL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/51jkjFdWwGL._AC_.jpg",
  "https://m.media-amazon.com/images/I/71iGgZng4sL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/71TlQsUAYeL._AC_SY879_.jpg",
  "https://m.media-amazon.com/images/I/41Hj7ERkZNL._AC_SY695_.jpg",
  "https://m.media-amazon.com/images/I/61w0rPUCwiL._AC_SY879_.jpg",
  "https://m.media-amazon.com/images/I/71GZM-TM+xL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/61ClnmsIm-L._AC_SY695_.jpg",
  "https://m.media-amazon.com/images/I/81G6JV57F2L._AC_SY695_.jpg",
  "https://m.media-amazon.com/images/I/71tUFdxb2fL._AC_SY695_.jpg",
  "https://m.media-amazon.com/images/I/61SMe-PDrQL._AC_SY879_.jpg",
  "https://m.media-amazon.com/images/I/91KtlmVsX-S._AC_SY879_.jpg",
  "https://m.media-amazon.com/images/I/91iqcSy7i5L._AC_SY695_.jpg",
  "https://m.media-amazon.com/images/I/51nL2y7-JdL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/612v4DRGHQL._AC_SY879_.jpg",
  "https://m.media-amazon.com/images/I/61SMe-PDrQL._AC_SY879_.jpg",
  "https://m.media-amazon.com/images/I/51EjRQCN9AL._AC_.jpg",
  "https://m.media-amazon.com/images/I/61YJzv8GyKL._AC_SY879_.jpg",
  "https://m.media-amazon.com/images/I/81pNxqFKFZS._AC_SY879_.jpg",
  "https://m.media-amazon.com/images/I/61ZsfZFQJ-YL._AC_SY879_.jpg",
  "https://m.media-amazon.com/images/I/61gjmwvR7zL._AC_SY695_.jpg",
  "https://m.media-amazon.com/images/I/61GIsOzbTyL._AC_SY695_.jpg",
  "https://m.media-amazon.com/images/I/41x-lcELSjL._AC_.jpg",
  "https://m.media-amazon.com/images/I/714Q2hFXwaL._AC_SX679_.jpg",
  //   "https://m.media-amazon.com/images/I/713rpoSFkEL._AC_SY879_.jpg",
  "https://m.media-amazon.com/images/I/51m0nW8BFlL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/61ybuPBoAzL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/61gjmwvR7zL._AC_SY695_.jpg",
  "https://m.media-amazon.com/images/I/41Nzdz63xzL._AC_SY695_.jpg",
  "https://m.media-amazon.com/images/I/61iuzSNWI+L._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/71ZFwdbzH2L._AC_SY695_.jpg",
  "https://m.media-amazon.com/images/I/61xbJk4LEDL._AC_.jpg",
  "https://m.media-amazon.com/images/I/71hwHjZg0qL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/91BHYughfhS._AC_SY879_.jpg",
  "https://m.media-amazon.com/images/I/91uMxCQHsoS._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/61IzNOQLY-L._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/91BHYughfhS._AC_SY879_.jpg",
  "https://m.media-amazon.com/images/I/71hwHjZg0qL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/A1mlCcHy+LS._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/71zmn1LTm3L._AC_SY879_.jpg",
  "https://m.media-amazon.com/images/I/71rpunC9SAL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/61WgjDTkN0L._AC_SY879_.jpg",
  "https://m.media-amazon.com/images/I/610N8cLsQ+L._AC_SY695_.jpg",
  "https://m.media-amazon.com/images/I/51XAmX9uyYL._AC_SY879_.jpg",
  "https://m.media-amazon.com/images/I/61r-eDvX44L._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/81x2Z2d3yQL._AC_SY695_.jpg",
  "https://m.media-amazon.com/images/I/91Tmlqnn3uL._AC_SX695_.jpg",
  "https://m.media-amazon.com/images/I/61BQ4uaWJRL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/41EcXj8wYEL._AC_SY695_.jpg",
  "https://m.media-amazon.com/images/I/61WgjDTkN0L._AC_SY879_.jpg",

  "https://m.media-amazon.com/images/I/914FRHucU3S._AC_SY879_.jpg",
  "https://lsco.scene7.com/is/image/lsco/D79590001-front-pdp-ld?fmt=webp&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=1760&hei=1760",
  "https://lsco.scene7.com/is/image/lsco/D79590001-detail2-pdp-ld?fmt=webp&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=1760&hei=1760",
];

const Gallery = () => {
  const breakpointColumnsObj = {
    default: 5,
    1536: 4,
    1024: 3,
    640: 2,
  };

  return (
    <div className="bg-white min-h-screen max-w-7xl mx-auto relative">
      <div className="p-4 sm:p-8 pb-8">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {productImages.map((link, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.02 }}
              className="mb-4 break-inside-avoid"
            >
              <div className="group relative overflow-hidden rounded-2xl  bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                <Image
                  src={link}
                  alt={`Product ${index + 1}`}
                  width={800}
                  height={0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="w-full h-auto block object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </Masonry>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-72 bg-linear-to-t from-white via-white to-transparent pointer-events-none z-20" />
    </div>
  );
};

export default Gallery;
