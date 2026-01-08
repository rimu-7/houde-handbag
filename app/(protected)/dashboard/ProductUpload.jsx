"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2, UploadCloud } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useLanguage } from "@/components/LanguageProvider"; // Hook for translations
import CategoriesTabs from "./CategoriesTabs"; // The component below

const FALLBACK_CATEGORIES = [
  { id: "Back Pack", en: "Back Pack", cn: "双肩包" },
  { id: "Tool Bag", en: "Tool Bag", cn: "工具包" },
  // ... add others if fetch fails
];

export default function ProductUpload() {
  const { lang, t } = useLanguage();
  const fileInputRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Filter state
  const [activeTab, setActiveTab] = useState("all");

  // Upload state
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  // --- 1. Fetch Data ---
  const fetchProducts = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setProducts(data.products || []);
      
      // Ensure categories are objects. If API fails, use fallback.
      setCategories(
        data.categories && data.categories.length > 0
          ? data.categories
          : FALLBACK_CATEGORIES
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to load inventory");
      setCategories(FALLBACK_CATEGORIES);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // --- 2. Handle Upload ---
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedCategory) return toast.error(t("Select a category", "请选择分类"));
    if (selectedFiles.length === 0) return toast.error(t("Select images", "请选择图片"));

    setLoading(true);
    const formData = new FormData();
    formData.append("category", selectedCategory); // Sends the ID (e.g., "Tote Bag")
    selectedFiles.forEach((file) => formData.append("images", file));

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Upload failed");
      }

      toast.success(t("Uploaded successfully", "上传成功"));
      
      // Reset form
      setSelectedFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      await fetchProducts(); // Refresh list
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- 3. Handle Image Deletion ---
  const handleDeleteImage = async (productId, imgUrl) => {
    // Note: You need a backend API that supports deleting a single image
    // For now, let's assume standard logic or delete the whole product if it's the last image
    try {
      // Optimistic UI update
      setProducts((prev) =>
        prev.map((p) => {
          if (p._id === productId) {
            return { ...p, images: p.images.filter((img) => img !== imgUrl) };
          }
          return p;
        }).filter(p => p.images.length > 0) // Remove product if no images left
      );

      // Example API Call (You need to implement the backend route for this)
      /* const res = await fetch(`/api/products/image`, {
        method: "DELETE",
        body: JSON.stringify({ productId, imageUrl: imgUrl }),
      });
      if(!res.ok) throw new Error("Failed to delete on server");
      */
      
      toast.success(t("Image removed", "图片已删除"));
    } catch (error) {
      toast.error("Failed to delete image");
      fetchProducts(); // Revert on error
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("Product Management", "产品管理")}
        </h1>
        <p className="text-muted-foreground">
          {t("Manage your gallery and inventory.", "管理您的图库和库存。")}
        </p>
      </div>

      {/* Upload Section */}
      <Card className="border-dashed border-2 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UploadCloud className="h-5 w-5" />
            {t("Upload New Images", "上传新图片")}
          </CardTitle>
          <CardDescription>
            {t("Select a category and add images.", "选择分类并添加图片。")}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleUpload} className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Select */}
              <div className="space-y-2">
                <Label>{t("Category", "分类")}</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("Select Category", "选择分类")} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {lang === "cn" ? cat.cn : cat.en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* File Input */}
              <div className="space-y-2">
                <Label>{t("Images", "图片")}</Label>
                <Input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}
                  className="cursor-pointer"
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  {selectedFiles.length > 0
                    ? `${selectedFiles.length} ${t("files selected", "个文件已选择")}`
                    : t("Max 10 images", "最多 10 张图片")}
                </p>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full md:w-auto md:ml-auto">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? t("Uploading...", "上传中...") : t("Upload", "上传")}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Inventory Tabs Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">{t("Inventory", "库存")}</h2>
        
        <CategoriesTabs
          categories={categories}
          products={products}
          fetching={fetching}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onDeleteImage={handleDeleteImage}
          lang={lang} // Pass language down
        />
      </div>
    </div>
  );
}