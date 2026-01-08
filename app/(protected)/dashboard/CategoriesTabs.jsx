"use client";

import { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import ImageTile from "./ImageTile"; // We define this below

export default function CategoriesTabs({
  categories = [], // Array of objects {id, en, cn}
  products = [],
  fetching,
  activeTab,
  setActiveTab,
  onDeleteImage,
  lang = "en",
}) {
  // Group products by Category ID for easy access
  const productByCategory = useMemo(() => {
    const map = new Map();
    // Assuming 1 Product Document per Category (based on your upload logic)
    // If you have multiple docs per category, you might need to flatten images here.
    products.forEach((p) => map.set(p.category, p));
    return map;
  }, [products]);

  // Combine fetched categories with any existing in products (safety check)
  const allCategoryIds = useMemo(() => {
    const fromProps = categories.map((c) => c.id);
    const fromProducts = products.map((p) => p.category);
    return Array.from(new Set([...fromProps, ...fromProducts]));
  }, [categories, products]);

  // Helper to get display name
  const getLabel = (catId) => {
    const found = categories.find((c) => c.id === catId);
    if (!found) return catId;
    return lang === "cn" ? found.cn : found.en;
  };

  if (fetching) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[340px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      {/* Scrollable Tabs List */}
      <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
        <TabsList className="flex flex-wrap h-auto bg-transparent gap-2 p-0 justify-start">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-primary data-[state=active]:text-white border"
          >
            {lang === "cn" ? "全部" : "All"}
          </TabsTrigger>
          
          {allCategoryIds.map((catId) => (
            <TabsTrigger 
              key={catId} 
              value={catId}
              className="data-[state=active]:bg-primary data-[state=active]:text-white border"
            >
              {getLabel(catId)}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* 1. ALL TAB CONTENT */}
      <TabsContent value="all" className="space-y-10">
        {allCategoryIds.map((catId) => {
          const product = productByCategory.get(catId);
          // If no product exists for this category, skip rendering in "All" view to save space
          if (!product || !product.images || product.images.length === 0) return null;

          return (
            <CategorySection
              key={catId}
              label={getLabel(catId)}
              product={product}
              onDeleteImage={onDeleteImage}
            />
          );
        })}
        {/* Empty State for All */}
        {products.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            No images uploaded yet.
          </div>
        )}
      </TabsContent>

      {/* 2. INDIVIDUAL TAB CONTENT */}
      {allCategoryIds.map((catId) => {
        const product = productByCategory.get(catId);
        return (
          <TabsContent key={catId} value={catId} className="mt-6 space-y-4">
            <CategorySection
              label={getLabel(catId)}
              product={product}
              onDeleteImage={onDeleteImage}
            />
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

// Sub-component for rendering a grid of images for a category
function CategorySection({ label, product, onDeleteImage }) {
  const imgs = product?.images || [];

  return (
    <section className="space-y-4 border rounded-xl p-6 bg-zinc-50/50">
      <div className="flex items-center justify-between gap-3 border-b pb-4">
        <h3 className="text-lg font-bold tracking-tight">{label}</h3>
        <Badge variant="secondary">{imgs.length} image(s)</Badge>
      </div>

      {imgs.length === 0 ? (
        <div className="py-8 text-sm text-muted-foreground text-center italic">
          No images in this category.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {imgs.map((src, idx) => (
            <ImageTile
              key={`${product._id}-${idx}`}
              src={src}
              alt={`${label} ${idx + 1}`}
              onDelete={() => onDeleteImage(product._id, src)}
            />
          ))}
        </div>
      )}
    </section>
  );
}