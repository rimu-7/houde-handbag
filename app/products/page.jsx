"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/LanguageProvider";

// ✅ Manual Translation Map (Fallback for string-based categories)
// This ensures categories translate even if the API just sends "Back Pack" as a string
const CATEGORY_TRANSLATIONS = {
  "All": "全部",
  "Back Pack": "双肩包",
  "Tool Bag": "工具包",
  "Makeup Bag": "化妆包",
  "Tote Bag": "托特包",
  "Insulated bag": "保温包",
  "Waterproof Bag": "防水包",
  "Game Case": "游戏收纳包",
  "Laptop Bag": "电脑包",
  "Tablet cases": "平板电脑包",
  "Headphone Bag": "耳机包",
  "Shoulder Strap": "肩带"
};

export default function GalleryPage() {
  const { lang, t } = useLanguage(); 
  // ✅ Detect Chinese (matches 'zh' from your provider OR 'cn')
  const isChinese = lang === "zh" || lang === "cn";

  const [allImages, setAllImages] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/products/public");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const products = data.products || [];

        // 1. Process Images
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

        // 2. Process Categories (Handle both Objects and Strings)
        const rawCategories = data.categories || [];
        const usedCategories = new Set(products.map((p) => p.category));
        const normalizedCategories = [];

        // Add "All" manually
        normalizedCategories.push({ id: "All", en: "All", cn: "全部" });

        // Helper to normalize data
        const processCat = (item) => {
          if (typeof item === 'object' && item !== null) {
            return { id: item.id, en: item.en || item.id, cn: item.cn || item.id };
          }
          // It is a string
          return {
            id: item,
            en: item,
            cn: CATEGORY_TRANSLATIONS[item] || item // Use local map if available
          };
        };

        // Add API categories
        rawCategories.forEach(cat => {
          const catObj = processCat(cat);
          normalizedCategories.push(catObj);
          usedCategories.delete(catObj.id);
        });

        // Add any remaining dynamic categories found on products
        usedCategories.forEach(catStr => {
          if (catStr && catStr !== "All") {
             normalizedCategories.push(processCat(catStr));
          }
        });

        setCategories(normalizedCategories);

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

  // Helper to get label based on current language state
  const getCategoryLabel = (catId) => {
    const catObj = categories.find((c) => c.id === catId);
    if (!catObj) return catId;
    return isChinese ? (catObj.cn || catObj.id) : (catObj.en || catObj.id);
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-12 mx-auto">
      <div className="mx-auto max-w-[1800px]">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-end md:justify-between">
          <div className="mb-8 space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {t("Product Collection", "产品系列")}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t(
                "Explore our curated gallery of premium bags and accessories.",
                "浏览我们精心挑选的优质包袋和配饰图库。"
              )}
            </p>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Sticky Filter Bar */}
        <div className="sticky top-0 z-30 bg-white/90 dark:bg-black/90 backdrop-blur-md py-4 -mx-4 px-4 md:px-0 md:mx-0 mb-6 border-b border-transparent transition-all">
          <div className="flex flex-wrap justify-center items-center gap-2 py-2 overflow-x-auto scrollbar-hide">
            {isPageLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-20 rounded-full" />
                ))
              : categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "text-xs font-bold uppercase tracking-wider px-4 py-2 mx-1 rounded-full transition-all duration-300 border whitespace-nowrap",
                      selectedCategory === cat.id
                        ? "bg-black text-white border-black dark:bg-white dark:text-black scale-105"
                        : "bg-gray-100 text-gray-500 border-transparent hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800"
                    )}
                  >
                    {/* ✅ Correctly toggles between EN/CN based on 'isChinese' */}
                    {isChinese ? (cat.cn || cat.id) : (cat.en || cat.id)}
                  </button>
                ))}
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isPageLoading ? (
            Array.from({ length: 12 }).map((_, i) => (
              <GallerySkeleton key={i} />
            ))
          ) : visibleImages.length > 0 ? (
            visibleImages.map((item) => (
              <GalleryItem
                key={item.uniqueId}
                item={item}
                categoryLabel={getCategoryLabel(item.category)}
              />
            ))
          ) : (
            <div className="col-span-full py-32 text-center text-muted-foreground">
              <p>
                {t("No images found in this category.", "该类别下暂无图片。")}
              </p>
              <Button variant="link" onClick={() => setSelectedCategory("All")}>
                {t("Reset Gallery", "重置图库")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GalleryItem({ item, categoryLabel }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="group relative w-full">
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-t-2xl md:rounded-2xl bg-gray-100 dark:bg-gray-900 shadow-sm transition-all hover:shadow-lg">
        {isLoading && (
          <Skeleton className="absolute inset-0 z-10 h-full w-full" />
        )}

        <Image
          src={item.src}
          alt={categoryLabel}
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
            {categoryLabel}
          </span>
        </div>
      </div>

      <div className="block md:hidden">
        <div className="w-full bg-white dark:bg-zinc-900 rounded-b-2xl border border-gray-200 dark:border-zinc-800 p-3 text-center shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wider text-black dark:text-white truncate">
            {categoryLabel}
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