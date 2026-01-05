"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function GalleryPage() {
  const [allImages, setAllImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const products = data.products || [];

        const flattenedImages = products.flatMap((product) =>
          (product.images || []).map((imgUrl, index) => ({
            uniqueId: `${product._id}-${index}`,
            src: imgUrl,
            category: product.category,
            parentId: product._id,
            timestamp: product.createdAt,
          }))
        );

        setAllImages(flattenedImages);

        const dynamicCategories = [
          "All",
          ...new Set(products.map((p) => p.category)),
        ];
        setCategories(
          data.categories ? ["All", ...data.categories] : dynamicCategories
        );
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchData();
  }, []);

  const visibleImages =
    selectedCategory === "All"
      ? allImages
      : allImages.filter((img) => img.category === selectedCategory);

  return (
    <div className="min-h-screen py-10 px-4 md:px-12  mx-auto">
      <div className="mx-auto max-w-[1800px]">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-primary">
              Products
            </h1>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Sticky Filter Bar */}
        <div className="sticky top-0 z-30 bg-white/90 dark:bg-black/90 backdrop-blur-md py-4 -mx-4 px-4 md:px-0 md:mx-0 mb-6 border-b border-transparent transition-all">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {isPageLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-20 rounded-full" />
                ))
              : categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 border",
                      selectedCategory === cat
                        ? "bg-black text-white border-black dark:bg-white dark:text-black scale-105"
                        : "bg-gray-100 text-gray-500 border-transparent hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800"
                    )}
                  >
                    {cat}
                  </button>
                ))}
          </div>
        </div>

        {/* MASONRY-STYLE GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isPageLoading ? (
            Array.from({ length: 12 }).map((_, i) => (
              <GallerySkeleton key={i} />
            ))
          ) : visibleImages.length > 0 ? (
            visibleImages.map((item) => (
              <GalleryItem key={item.uniqueId} item={item} />
            ))
          ) : (
            <div className="col-span-full py-32 text-center text-muted-foreground">
              <p>No images found in this category.</p>
              <Button variant="link" onClick={() => setSelectedCategory("All")}>
                Reset Gallery
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GalleryItem({ item }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    // 1. Outer wrapper: No fixed aspect ratio here so it can hold the bottom text on mobile
    <div className="group relative w-full">
      {/* 2. Image Wrapper: This holds the Aspect Ratio and the Image */}
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-t-2xl md:rounded-2xl bg-gray-100 dark:bg-gray-900 shadow-sm transition-all hover:shadow-lg">
        {/* Loading Skeleton */}
        {isLoading && (
          <Skeleton className="absolute inset-0 z-10 h-full w-full" />
        )}

        {/* The Image */}
        <Image
          src={item.src}
          alt={item.category}
          fill
          unoptimized={true}
          className={cn(
            "object-cover transition-transform duration-700 ease-in-out will-change-transform",
            "group-hover:scale-110",
            isLoading ? "scale-110 blur-xl" : "scale-100 blur-0"
          )}
          onLoad={() => setIsLoading(false)}
        />


        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 items-center justify-center backdrop-blur-[2px]">
          <span className="text-white font-medium text-lg tracking-wide border border-white/20 bg-white/10 px-4 py-2 rounded-full">
            {item.category}
          </span>
        </div>
      </div>

      <div className="block md:hidden ">
        <div className="w-full bg-white dark:bg-zinc-900 rounded-b-2xl border border-gray-200 dark:border-zinc-800 p-3 text-center shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wider text-black dark:text-white">
            {item.category}
          </p>
        </div>
      </div>
    </div>
  );
}
function GallerySkeleton() {
  return (
    <div className="aspect-3/4 w-full rounded-xl overflow-hidden relative">
      <Skeleton className="h-full w-full" />
    </div>
  );
}
