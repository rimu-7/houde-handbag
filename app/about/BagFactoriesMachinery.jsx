"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Factory, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/components/LanguageProvider";

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g"><stop stop-color="#f3f4f6" offset="0%" /><stop stop-color="#e5e7eb" offset="50%" /><stop stop-color="#f3f4f6" offset="100%" /></linearGradient></defs>
  <rect width="${w}" height="${h}" fill="#f3f4f6"/>
  <rect id="r" width="${w}" height="${h}" fill="url(#g)"/>
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite" />
</svg>
`;

const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
const shimmerDataUrl = (w, h) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;

function cloudinaryPublicId(src = "") {
  if (!src.includes("/upload/")) return src;
  let after = src.split("/upload/")[1] || "";
  after = after.split("?")[0];
  const vIndex = after.search(/v\d+\//);
  if (vIndex >= 0) after = after.slice(vIndex);
  return after.replace(/^v\d+\//, "").replace(/\.[a-z0-9]+$/i, "");
}

const data = {
  hero: {
    en: {
      title: "Advanced Machinery in Our Cloth Bag Factories",
      subtitle:
        "High-speed automation & precision tools for plastic, non-woven, paper & leather bags – powered by our dual China & Vietnam bases.",
    },
    zh: {
      title: "我们布袋工厂的先进设备",
      subtitle:
        "高速自动化与精密工具，生产塑料、无纺布、纸袋及皮革手袋——由中国与越南双基地驱动。",
    },
  },
  factories: {
    title: { en: "Our Two Production Bases", zh: "两大生产基地" },
    desc: {
      en: "Same OEM/ODM services, unified quality system — flexible capacity from China & Vietnam.",
      zh: "同一OEM/ODM服务，统一质量体系——中国+越南双基地灵活产能。",
    },
    china: {
      name: { en: "China Base", zh: "中国基地" },
      desc: {
        en: "Core hub for innovation & large-scale production. State-of-the-art lines for extrusion, ultrasonic sealing, printing & bag-making. Unified SOPs + strict QC for premium quality & high volume.",
        zh: "创新与大规模生产核心基地。配备最先进的挤出、超声波密封、印刷与制袋生产线。统一SOP+严格质检，确保高端品质与大批量生产。",
      },
    },
    vietnam: {
      name: { en: "Vietnam Base", zh: "越南基地" },
      desc: {
        en: "Mirror standards of China base. Specializes in eco-friendly materials & flexible mid-high volume runs. Agile scheduling & stable delivery for global clients.",
        zh: "与中国基地相同标准。专注环保材料与灵活中高产量。敏捷排产与稳定交付，服务全球客户。",
      },
    },
    summary: {
      en: "Dual bases = unified quality, flexible capacity, reliable performance across all bag categories.",
      zh: "双基地 = 统一品质、灵活产能、各类袋子可靠表现。",
    },
  },
  machineryTitle: {
    en: "Key Cloth Bag Machines",
    zh: "关键布袋机",
  },

  machinery: [
    {
      category: { en: "Plastic Bag Production", zh: "塑料袋生产" },
      desc: {
        en: "High-speed lines for shopping & garbage bags",
        zh: "高速生产线，生产购物袋与垃圾袋",
      },
      color: "from-blue-600 to-indigo-700",
      machines: [
        {
          name: { en: "Film Blowing Machine", zh: "吹膜机" },
          desc: { en: "Extrudes PE film rolls", zh: "挤出PE薄膜卷材" },
          dummyImg:
            "https://via.placeholder.com/600x400/1e40af/ffffff?text=Film+Blowing",
        },
        {
          name: { en: "T-Shirt Bag Making Machine", zh: "背心袋制袋机" },
          desc: { en: "Cuts & seals vest-style bags", zh: "切割并热封背心袋" },
          dummyImg:
            "https://via.placeholder.com/600x400/1e3a8a/ffffff?text=T-Shirt+Bag",
        },
        {
          name: { en: "Flexo Printing Machine", zh: "柔版印刷机" },
          desc: { en: "Prints logos on film", zh: "在薄膜上印刷logo" },
          dummyImg:
            "https://via.placeholder.com/600x400/312e81/ffffff?text=Flexo+Printing",
        },
      ],
    },

    {
      category: { en: "Non-Woven Cloth Bag Production", zh: "无纺布袋生产" },
      desc: { en: "Eco-friendly reusable bags", zh: "环保可重复使用袋" },
      color: "from-green-600 to-emerald-700",
      machines: [
        {
          name: {
            en: "Fully Automatic Non-Woven Bag Making Machine",
            zh: "全自动无纺布制袋机",
          },
          desc: {
            en: "Ultrasonic sealing, handle attachment",
            zh: "超声波密封+手柄自动附着",
          },
          dummyImg:
            "https://via.placeholder.com/600x400/065f46/ffffff?text=Non-Woven+Bag",
        },
        {
          name: { en: "D-Cut / Box Bag Machine", zh: "D型/方底袋机" },
          desc: { en: "Makes shaped shopping bags", zh: "生产造型购物袋" },
          dummyImg:
            "https://via.placeholder.com/600x400/047857/ffffff?text=D-Cut+Bag",
        },
      ],
    },

    {
      category: { en: "Paper Bag Production", zh: "纸袋生产" },
      desc: { en: "Grocery & retail paper bags", zh: "杂货与零售纸袋" },
      color: "from-orange-600 to-amber-700",
      machines: [
        {
          name: { en: "Square Bottom Paper Bag Machine", zh: "方底纸袋机" },
          desc: {
            en: "Forms & glues square-bottom bags",
            zh: "成型并粘合方底纸袋",
          },
          dummyImg:
            "https://via.placeholder.com/600x400/c2410c/ffffff?text=Paper+Bag",
        },
      ],
    },

    {
      category: {
        en: "Leather / Fashion Bag Production",
        zh: "皮革/时尚手袋生产",
      },
      desc: { en: "Premium handbags & totes", zh: "高端手袋与托特包" },
      color: "from-purple-600 to-pink-700",
      machines: [
        {
          name: {
            en: "Leather Cutting & Skiving Machine",
            zh: "皮革切割与削边机",
          },
          desc: { en: "Precise panel cutting", zh: "精确切割皮革面板" },
          dummyImg:
            "https://via.placeholder.com/600x400/7c3aed/ffffff?text=Leather+Cutting",
        },
        {
          name: {
            en: "Heavy-Duty Walking Foot Sewing Machine",
            zh: "重型行走压脚缝纫机",
          },
          desc: { en: "Stitches thick leather", zh: "缝制厚皮革" },
          dummyImg:
            "https://via.placeholder.com/600x400/ec4899/ffffff?text=Sewing+Machine",
        },
      ],
    },
  ],
};

export default function BagFactoriesMachinery() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  const hero = data.hero[isEn ? "en" : "zh"];
  const factories = data.factories;
  const { machinery, machineryTitle } = data;


  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-amber-700 to-amber-900 py-20 text-white overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            {hero.title}
          </motion.h1>
          <p className="mt-6 text-lg md:text-xl opacity-90 max-w-4xl mx-auto">
            {hero.subtitle}
          </p>
        </div>
      </section>

      {/* Factories Section */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {factories.title[isEn ? "en" : "zh"]}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {factories.desc[isEn ? "en" : "zh"]}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {["china", "vietnam"].map((key) => {
              const factory = factories[key];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="group"
                >
                  <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border-0">
                    <div className="relative aspect-[16/9] bg-gradient-to-br from-amber-800 to-amber-950">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Factory className="h-24 w-24 text-amber-300 opacity-40 group-hover:opacity-70 transition-opacity" />
                      </div>
                      <Badge className="absolute bottom-6 left-6 text-xl px-6 py-3 bg-white/95 text-gray-900 shadow-lg">
                        <Factory className="mr-3 h-6 w-6" />{" "}
                        {factory.name[isEn ? "en" : "zh"]}
                      </Badge>
                    </div>
                    <CardContent className="p-8 bg-white">
                      <p className="text-gray-700 leading-relaxed text-base">
                        {factory.desc[isEn ? "en" : "zh"]}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <p className="text-center mt-12 text-lg text-gray-700 italic max-w-3xl mx-auto">
            {factories.summary[isEn ? "en" : "zh"]}
          </p>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Machinery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
             {machineryTitle[isEn ? "en" : "zh"]}
            </h2>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {machinery.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="overflow-hidden shadow-2xl border-0">
                  <CardHeader
                    className={`bg-gradient-to-r ${cat.color} text-white py-8`}
                  >
                    <CardTitle className="text-2xl">
                      {cat.category[isEn ? "en" : "zh"]}
                    </CardTitle>
                    <CardDescription className="text-white/90 mt-2 text-base">
                      {cat.desc[isEn ? "en" : "zh"]}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <Accordion type="single" collapsible defaultValue="0">
                      {cat.machines.map((machine, mIdx) => (
                        <AccordionItem key={mIdx} value={mIdx.toString()}>
                          <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                            {machine.name[isEn ? "en" : "zh"]}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600">
                            {machine.desc[isEn ? "en" : "zh"]}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>

                    {/* Dummy Images Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
                      {cat.machines.map((m, i) => (
                        <div
                          key={i}
                          className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
                        >
                          <img
                            src={m.dummyImg}
                            alt={m.name[isEn ? "en" : "zh"]}
                            className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-3 px-4">
                            <p className="text-white text-sm font-medium">
                              {m.name[isEn ? "en" : "zh"]}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-white text-center">
        <p className="text-lg">
          {isEn
            ? "All machines work together with auxiliary equipment for efficient cloth bag production."
            : "所有设备协同辅助设备，实现高效布袋生产。"}
        </p>
      </footer>
    </>
  );
}
