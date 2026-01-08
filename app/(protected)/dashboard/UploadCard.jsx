"use client";

import { useRef, useState } from "react";
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
import { useLanguage } from "@/components/LanguageProvider"; // ✅ Import Language Hook

export default function UploadCard({ categories = [], onUploadSuccess }) {
  const { lang, t } = useLanguage(); // ✅ Get current language
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedCategory) return toast.error(t("Please select a category", "请选择分类"));
    if (selectedFiles.length === 0) return toast.error(t("Please select images", "请选择图片"));
    if (selectedFiles.length > 10) return toast.error(t("Max 10 images allowed", "最多允许 10 张图片"));

    setLoading(true);

    const formData = new FormData();
    formData.append("category", selectedCategory);
    selectedFiles.forEach((file) => formData.append("images", file));

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      toast.success(t("Product uploaded successfully!", "产品上传成功！"));

      // Reset Form
      setSelectedFiles([]);
      setSelectedCategory("");
      if (fileInputRef.current) fileInputRef.current.value = "";

      // Trigger refresh in parent component
      if (onUploadSuccess) onUploadSuccess();

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-dashed border-2 shadow-sm mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UploadCloud className="h-5 w-5" />
          {t("Upload New Images", "上传新图片")}
        </CardTitle>
        <CardDescription>
          {t("Select a category and choose up to 10 images.", "选择分类并最多选择 10 张图片。")}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleUpload} className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* CATEGORY SELECT */}
            <div className="space-y-2">
              <Label htmlFor="category">{t("Category", "分类")}</Label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder={t("Select a category", "选择一个分类")} />
                </SelectTrigger>
                <SelectContent>
                  {(categories || []).map((cat) => {
                    // ✅ FIXED LOGIC: Handle both Objects and Strings
                    const isObject = typeof cat === "object" && cat !== null;
                    const value = isObject ? cat.id : cat;
                    const label = isObject ? (lang === "cn" ? cat.cn : cat.en) : cat;

                    return (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* FILE INPUT */}
            <div className="space-y-2">
              <Label htmlFor="images">{t("Product Images", "产品图片")}</Label>
              <Input
                ref={fileInputRef}
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>
                  setSelectedFiles(Array.from(e.target.files || []))
                }
                className="cursor-pointer file:text-primary"
              />
              <p className="text-[0.8rem] text-muted-foreground">
                {selectedFiles.length > 0
                  ? `${selectedFiles.length} ${t("file(s) selected", "个文件已选择")}`
                  : t("Max 10 images (JPG, PNG, WebP)", "最多 10 张图片 (JPG, PNG, WebP)")}
              </p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto md:ml-auto"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? t("Uploading...", "上传中...") : t("Upload Product", "上传产品")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}