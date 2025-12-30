"use client";

import React, { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/components/LanguageProvider";
import { content } from "@/lib/dictionary/aboutData";

// Import your components
import AboutPage from "./page copy";
import TwoFactories from "./TwoFactories";
import BagFactoriesMachinery from "./BagFactoriesMachinery";
import WhyUsSection from "./Whyus";
import FAQSection from "./FAQSection";
import CatalogSection from "./CatalogSection";
import FacilitiesGallery from "./FacilitiesGallery";
import InternalTesting from "./InternalTesting";

export default function AboutUs() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  // 1. Get content for child components
  const currentContent = useMemo(() => content?.[lang] ?? content.en, [lang]);

  // 2. Define translated labels for the Tabs
  const tabLabels = {
    about: { en: "About", zh: "关于我们" },
    factories: { en: "Factories", zh: "工厂展示" },
    catalog: { en: "Catalog", zh: "产品目录" },
    whyus: { en: "Why Us", zh: "选择我们" },
    faq: { en: "FAQ", zh: "常见问题" },
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Tabs defaultValue="about" className="w-full flex flex-col items-center">
        {/* Responsive Tabs List:
          - Sticky top: Keeps navigation accessible
          - overflow-x-auto: Allows horizontal scrolling on mobile
          - no-scrollbar: Hides the scrollbar for a cleaner look
        */}
        <div className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
          <div className="container mx-auto px-4 md:px-6">
            <TabsList className="w-full h-auto flex justify-start md:justify-center overflow-x-auto py-3 bg-transparent gap-2 md:gap-6 no-scrollbar">
              <StyledTrigger value="about">
                {tabLabels.about[isEn ? "en" : "zh"]}
              </StyledTrigger>
              <StyledTrigger value="factories">
                {tabLabels.factories[isEn ? "en" : "zh"]}
              </StyledTrigger>
              <StyledTrigger value="catelog">
                {tabLabels.catalog[isEn ? "en" : "zh"]}
              </StyledTrigger>
              <StyledTrigger value="whyus">
                {tabLabels.whyus[isEn ? "en" : "zh"]}
              </StyledTrigger>
              <StyledTrigger value="faq">
                {tabLabels.faq[isEn ? "en" : "zh"]}
              </StyledTrigger>
            </TabsList>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full">
          <TabsContent value="about" className="mt-0 focus-visible:ring-0">
            <AboutPage />
          </TabsContent>

          <TabsContent value="factories" className="mt-0 focus-visible:ring-0">
            <TwoFactories />
            <FacilitiesGallery data={currentContent.sections.facilities} />
            <BagFactoriesMachinery />
            <InternalTesting data={currentContent.sections.testing} />
          </TabsContent>

          <TabsContent value="whyus" className="mt-0 focus-visible:ring-0">
            <WhyUsSection />
          </TabsContent>

          <TabsContent value="faq" className="mt-0 focus-visible:ring-0">
            <FAQSection />
          </TabsContent>

          <TabsContent value="catelog" className="mt-0 focus-visible:ring-0">
            <CatalogSection />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

// Helper component for consistent styling
function StyledTrigger({ value, children }) {
  return (
    <TabsTrigger
      value={value}
      className="
        rounded-full px-5 py-2.5 text-sm font-medium transition-all
        whitespace-nowrap 
        data-[state=inactive]:text-slate-600 
        data-[state=inactive]:hover:bg-slate-100 
        data-[state=active]:bg-amber-700 
        data-[state=active]:text-white 
        data-[state=active]:shadow-md
      "
    >
      {children}
    </TabsTrigger>
  );
}