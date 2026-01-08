"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { Download, FileText, ExternalLink } from "lucide-react";

const PDF_URL =
  "https://res.cloudinary.com/drnascc38/image/upload/v1767088868/Profile_and_Catalogue_1_1_aassgi.pdf";

const catalogContent = {
  header: {
    tag: {
      en: "2026 Collection",
      zh: "2026 系列",
    },
    // Split into two parts to keep the styling (Black vs Amber)
    titlePart1: {
      en: "Product",
      zh: "产品",
    },
    titlePart2: {
      en: "Catalog",
      zh: "目录",
    },
    description: {
      en: "Browse our complete range of bespoke bags and customization options directly below.",
      zh: "在下方直接浏览我们完整的定制包袋系列及定制选项。",
    },
  },
  actions: {
    download: {
      en: "Download PDF",
      zh: "下载 PDF",
    },
    fallbackText: {
      en: "Can't see the document?",
      zh: "无法查看文档？",
    },
    fallbackLink: {
      en: "Open in new tab",
      zh: "在新标签页打开",
    },
  },
};

export default function CatalogSection() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  // Memoize translations
  const t = useMemo(
    () => ({
      header: {
        tag: catalogContent.header.tag[isEn ? "en" : "zh"],
        titlePart1: catalogContent.header.titlePart1[isEn ? "en" : "zh"],
        titlePart2: catalogContent.header.titlePart2[isEn ? "en" : "zh"],
        description: catalogContent.header.description[isEn ? "en" : "zh"],
      },
      actions: {
        download: catalogContent.actions.download[isEn ? "en" : "zh"],
        fallbackText: catalogContent.actions.fallbackText[isEn ? "en" : "zh"],
        fallbackLink: catalogContent.actions.fallbackLink[isEn ? "en" : "zh"],
      },
    }),
    [isEn]
  );

  return (
    <section className="py-24 bg-slate-50" id="catalog">
      <div className="container mx-auto px-6">
        {/* 1. HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full font-medium text-sm">
              <FileText className="w-4 h-4" /> {t.header.tag}
            </div>
            <h2 className="text-4xl font-serif font-bold text-slate-900">
              {t.header.titlePart1}{" "}
              <span className="text-amber-700">{t.header.titlePart2}</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t.header.description}
            </p>
          </div>

          {/* Download Button */}
          <a href={PDF_URL} download target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg h-12 px-8"
            >
              <Download className="mr-2 h-5 w-5" /> {t.actions.download}
            </Button>
          </a>
        </div>

        {/* 2. EMBEDDED PDF VIEWER */}
        <div className="relative w-full h-[500px] md:h-[800px] bg-slate-200 rounded-2xl overflow-hidden shadow-2xl border border-slate-300">
          <iframe
            src={`${PDF_URL}#toolbar=0&navpanes=0&scrollbar=0`}
            className="w-full h-full"
            title="Product Catalog"
          />
        </div>

        {/* 3. MOBILE FALLBACK */}
        <p className="text-center text-sm text-slate-400 mt-6 md:hidden">
          {t.actions.fallbackText}
          <a
            href={PDF_URL}
            target="_blank"
            className="underline text-amber-700 font-medium ml-1 inline-flex items-center"
          >
            {t.actions.fallbackLink} <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </p>
      </div>
    </section>
  );
}
