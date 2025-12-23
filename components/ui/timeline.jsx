"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import Link from "next/link";

export const Timeline = ({ data }) => {
  const { lang, t } = useLanguage();
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref, data, lang]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Function to format date as "June, 2024"
  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    
    try {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) return dateString;
      
      // Format as "Month, Year"
      const options = { 
        month: 'long', 
        year: 'numeric' 
      };
      
      // For Chinese locale
      if (lang === 'zh') {
        options.month = 'long';
        // Chinese month names
        const chineseMonths = [
          '一月', '二月', '三月', '四月', '五月', '六月',
          '七月', '八月', '九月', '十月', '十一月', '十二月'
        ];
        const month = chineseMonths[date.getMonth()];
        return `${month}, ${date.getFullYear()}`;
      }
      
      return date.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', options);
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  return (
    <div
      className="w-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-1 w-8 bg-amber-500 rounded-full"></div>
            <span className="text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              {t("Our Journey", "我们的历程")}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl mb-6 text-gray-900 dark:text-white max-w-4xl font-bold">
            {t("Houde Handbag Milestones", "厚德手袋里程碑")}
          </h2>
          
          <div className="max-w-3xl">
            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-4">
              {t(
                "Founded in 2014, Houde Handbag Co., Ltd. is a comprehensive handbag enterprise integrating R&D, production and sales.",
                "厚德手袋有限公司成立于2014年，是一家集研发、生产、销售于一体的综合性手袋企业。"
              )}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
              {t(
                "We adopt professional system management with clear and accurate data, ERP operating system, billion-piece production system, and ET paper output system—always focused on complete bag manufacturing.",
                "我们采用专业的系统管理，数据清晰准确，ERP操作系统，亿件生产系统，以及ET纸样输出系统——始终专注于完整的箱包制造。"
              )}
            </p>
          </div>
          
          {/* Company Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">2014</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t("Year Founded", "成立年份")}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">10+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t("Years Experience", "年经验")}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">1B+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t("Bags Production Capacity", "袋生产能力")}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">4</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t("Integrated Systems", "集成系统")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-white dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
        <div ref={ref} className="relative max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("Our Development Timeline", "我们的发展时间线")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t("Key moments that shaped our journey in handbag manufacturing excellence", "塑造我们卓越手袋制造之旅的关键时刻")}
            </p>
          </div>

          {data.map((item, index) => (
            <div
              key={item._id || index}
              className="flex justify-start pt-10 md:pt-20 md:gap-10"
            >
              {/* --- Sticky Date Section --- */}
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div className="h-12 absolute left-2 md:left-1 w-12 rounded-full bg-white dark:bg-gray-900 border-2 border-amber-500 flex items-center justify-center shadow-lg">
                  <div className="h-3 w-3 rounded-full bg-amber-500" />
                </div>
                <h3 className="hidden md:block text-xl md:pl-24 md:text-4xl font-bold text-gray-800 dark:text-gray-200">
                  {formatDisplayDate(item.eventDate)}
                </h3>
              </div>

              {/* --- Content Section --- */}
              <div className="relative pl-20 pr-4 md:pl-6 w-full">
                <div className="md:hidden mb-6">
                  <div className="inline-flex items-center gap-2 mb-2">
                    <div className="h-1 w-6 bg-amber-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                      {formatDisplayDate(item.eventDate)}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {lang === "en" ? item.entitle : item.zntitle}
                    </h4>
                    <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4"></div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {lang === "en" ? item.endescription : item.zndescription}
                  </p>
                  
                  {/* Category Tag */}
                  {(item.category || item.type) && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-medium rounded-full">
                        {lang === "en" 
                          ? (item.category || item.type || "Milestone")
                          : (item.category_zh || item.type_zh || "里程碑")
                        }
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* --- Progress Line --- */}
          <div
            style={{ height: height + "px" }}
            className="absolute md:left-9 left-9 top-0 overflow-hidden w-[3px] bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-t from-amber-500 via-orange-500 to-transparent rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t("Continuing Our Journey of Excellence", "持续我们的卓越之旅")}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            {t("At Houde Handbag, we're committed to innovation and quality in every bag we create. Follow our journey as we continue to set new standards in the industry.", "在厚德手袋，我们致力于每只手袋的创新和质量。跟随我们的旅程，继续在行业中设定新标准。")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about" className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors duration-300">
              {t("View Our Products", "查看我们的产品")}
            </Link>
            <Link href="/contact" className="px-8 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg border border-gray-300 dark:border-gray-700 transition-colors duration-300">
              {t("Contact Us", "联系我们")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};