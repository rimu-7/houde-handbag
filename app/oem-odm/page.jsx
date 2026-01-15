"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/components/LanguageProvider";
import { Mail, Phone, MessageCircle, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const content = {
  hero: {
    en: {
      title: "China Top Bag Manufacturer",
      subtitle: "Tailor-made and produce all kinds of bags for customers!",
      description:
        "Bespoke bags give you the opportunity to adapt and build your brand to your liking. We offer exactly what you need in the best designs. Our unique taste in bespoke bags is worth the investment. In addition, bespoke bags allow you to choose the design that suits your brand.",
      cta: "Contact Us",
      cta2: "Get a Free Solution",
    },
    zh: {
      title: "中国顶级包袋制造商",
      subtitle: "为客户量身定制并生产各类包袋！",
      description:
        "定制包袋让您有机会按照自己的喜好调整并打造品牌。我们提供您所需的最佳设计。我们对定制包袋的独特品味值得投资。此外，定制包袋让您选择适合品牌的款式。",
      cta: "联系我们",
      cta2: "获取免费方案",
    },
  },
  process: {
    title: { en: "Customization Process", zh: "定制流程" },
    steps: [
      {
        en: "1. Client Request",
        zh: "1. 客户需求",
        imgUrl:
          "https://res.cloudinary.com/drnascc38/image/upload/v1767072745/30b070f0-70b8-4f0e-9e85-a6489bad7390.png",
      },
      {
        en: "2. Develop Design",
        zh: "2. 设计开发",
        imgUrl:
          "https://res.cloudinary.com/drnascc38/image/upload/v1767073801/ed7891ef-b0cd-495e-9598-a6b374daaf9f.png",
      },
      {
        en: "3. Material Procurement",
        zh: "3. 材料采购",
        imgUrl:
          "https://res.cloudinary.com/drnascc38/image/upload/v1767073203/5d07f316-fa85-4cd7-9623-20f922e7566e.png",
      },
      {
        en: "4. Start Making Samples",
        zh: "4. 制作样品",
        imgUrl:
          "https://res.cloudinary.com/drnascc38/image/upload/v1767073295/85f41133-1676-43c6-960b-efedde4937be.png",
      },
      {
        en: "5. Client Confirmation",
        zh: "5. 客户确认",
        imgUrl:
          "https://res.cloudinary.com/drnascc38/image/upload/v1767073338/97d6618d-7408-40df-83cd-df2a96697905.png",
      },
      {
        en: "6. MANUFACTURE",
        zh: "6. 大货生产",
        imgUrl:
          "https://res.cloudinary.com/drnascc38/image/upload/v1767073374/605c3a50-3472-4f26-9859-fbefb25afaf7.png",
      },
      {
        en: "7. Quality Inspection",
        zh: "7. 品质检验",
        imgUrl:
          "https://res.cloudinary.com/drnascc38/image/upload/v1767073418/653d174f-3783-45d5-aade-a352c9209c07.png",
      },
      {
        en: "8. Packing and Shipping",
        zh: "8. 包装发货",
        imgUrl:
          "https://res.cloudinary.com/drnascc38/image/upload/v1767073457/a6123d55-0ce8-4b3f-9139-e615ebf899a7.png",
      },
      {
        en: "9. After Service",
        zh: "9. 售后服务",
        imgUrl:
          "https://res.cloudinary.com/drnascc38/image/upload/v1767073480/97c94dbf-c794-4787-9049-5135527e76e5.png",
      },
    ],
  },
  bagTypes: {
    title: { en: "Bag Type Options", zh: "包袋类型选择" },
    description: {
      en: "We are able to offer you the manufacture and custom design of many types of bags. Our professional design and manufacturing experience can manufacture for you: tote bags, backpacks, leather backpacks, crossbody bags, shoulder bags, wallets, cosmetic bags, luggage, canvas bags and much more.",
      zh: "我们可为您制造和定制设计多种包袋。凭借专业的设计与制造经验，我们可生产：手提袋、背包、皮革背包、斜挎包、单肩包、钱包、化妆包、行李箱、帆布袋等更多品类。",
    },
  },
  materials: {
    title: { en: "Material Selection", zh: "材料选择" },
    description: {
      en: "As a leading luggage manufacturer, we work with many material suppliers. We can guarantee the best quality materials for your products. We offer a wide range of materials for you to choose from.",
      zh: "作为领先的行李包袋制造商，我们与众多材料供应商合作。可为您的产品保证最佳品质材料。我们提供多种材料供您选择。",
    },
  },
  colors: {
    title: { en: "Bag Color Selection", zh: "包袋颜色选择" },
    description: {
      en: "A wide range of colours for you to choose from. We use Pantone colour charts and carry out tests to ensure the final product meets your expectations. We also have leather type and color table — please contact us for details.",
      zh: "提供丰富颜色供您选择。我们使用Pantone色卡，并进行测试确保最终产品符合您的期望。我们还有皮革类型与颜色表 — 请联系我们获取详情。",
    },
  },
  logo: {
    title: { en: "Logo Design", zh: "Logo设计" },
  },
  order: {
    title: { en: "Order Notice", zh: "订单须知" },
    customization: {
      en: "Customization",
      zh: "定制选项",
    },
    items: [
      {
        en: "Customized logo (Min. Order: 300 Pieces)",
        zh: "定制Logo（最小起订量：300件）",
      },
      {
        en: "Customized packaging (Min. Order: 300 Pieces)",
        zh: "定制包装（最小起订量：300件）",
      },
      {
        en: "Graphic customization (Min. Order: 300 Pieces)",
        zh: "图形定制（最小起订量：300件）",
      },
    ],
    delivery: {
      en: "Delivery time",
      zh: "交货时间",
    },
    deliveryText: {
      en: "14 days for sample, 30-35 days for MOQ production.",
      zh: "样品7天, MOQ 生产15-30天。",
    },
    payment: {
      en: "Payment Term",
      zh: "付款方式",
    },
    paymentItems: [
      { en: "T/T (Telegraphic transfer)", zh: "T/T（电汇）" },
      { en: "L/C", zh: "L/C（信用证）" },
      { en: "Western Union", zh: "Western Union（西联）" },
      { en: "Alipay", zh: "支付宝" },
    ],
  },
  about: {
    title: {
      en: "YC Making - Leading Bag Manufacturer in China",
      zh: "YC Making - 中国领先包袋制造商",
    },
    description: {
      en: "We are a bag manufacturer with professional manufacturing capabilities, we have our own modern factory and design team. We specialise in providing high-end customised backpacks, bags and totes to overseas customers. We have an international reputation and we are happy to provide our best service to each and every customer. Our certifications include ISO9001, Sedex, BSCI etc. We currently serve over 1000 customers and have helped them to grow their business. If you need a customised bag, then we are the best choice for you!",
      zh: "我们是一家拥有专业制造能力的包袋制造商，拥有自己的现代化工厂和设计团队。专注于为海外客户提供高端定制背包、包袋和手提袋。我们拥有国际声誉，乐意为每一位客户提供最佳服务。我们的认证包括ISO9001、Sedex、BSCI等。目前已服务超过1000位客户，并帮助他们发展业务。如果您需要定制包袋，我们是您的最佳选择！",
    },
  },
  button: {
    title: {
      en: "Contact Us Today",
      zh: "立即联系我们",
    },
  },
  button1: {
    title: {
      en: "WhatsApp Inquire",
      zh: "WhatsApp咨询",
    },
  },
};

const polishedImages = {
  heroBg: "https://images.pexels.com/photos/5235169/pexels-photo-5235169.jpeg",
  factory: [
    "https://images.unsplash.com/photo-1581092160607-34b0f3d8e7a9?auto=format&fit=crop&q=80&w=1200",
    "https://images.pexels.com/photos/4488618/pexels-photo-4488618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    "https://images.pexels.com/photos/5864440/pexels-photo-5864440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.unsplash.com/photo-1618389118363-e114b64f373e?auto=format&fit=crop&q=80&w=1200",
    "https://images.pexels.com/photos/6576861/pexels-photo-6576861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1200",
    "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ],
  bags: [
    {
      id: 1,
      name: "Tote Bag",
      nameZh: "手提袋",
      description: {
        en: "Large open bag with parallel handles, perfect for everyday shopping and casual carry.",
        zh: "大开口平行提手包，适合日常购物和休闲携带。",
      },
      url: "https://plus.unsplash.com/premium_photo-1681324227573-953664cf9b32?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VG90ZSUyMEJhZ3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 18,
      name: "Laptop Bag",
      nameZh: "电脑包",
      description: {
        en: "Padded bag designed to carry and protect laptops and accessories.",
        zh: "带衬垫的包，专为携带和保护笔记本电脑及配件而设计。",
      },
      url: "https://images.unsplash.com/photo-1643033998438-38b4211fa2d5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wJTIwYmFnfGVufDB8fDB8fHww",
    },
    {
      id: 29,
      name: "Backpack",
      nameZh: "背包",
      description: {
        en: "Bag carried on the back with two shoulder straps, ideal for daily use and travel.",
        zh: "双肩带背负包，适合日常使用和旅行。",
      },
      url: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFja3BhY2t8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 52,
      name: "Makeup Bag",
      nameZh: "化妆包",
      description: {
        en: "Compact pouch for organizing cosmetics, brushes, and skincare essentials.",
        zh: "用于整理化妆品、刷子和护肤必需品的便携小包。",
      },
      url: "https://images.unsplash.com/photo-1632147341802-817aa47ae84b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fG1ha2V1cCUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 57,
      name: "Waterproof Bag",
      nameZh: "防水包",
      description: {
        en: "Sealed bag that protects contents from water, great for outdoor and wet activities.",
        zh: "密封防水包，保护物品免受水浸，适合户外和涉水活动。",
      },
      url: "https://images.pexels.com/photos/16359256/pexels-photo-16359256.jpeg",
    },
    {
      id: 77,
      name: "Insulated Bag",
      nameZh: "保温包",
      description: {
        en: "Thermal bag that keeps food and drinks hot or cold for hours.",
        zh: "保温包，可长时间保持食物饮料冷热。",
      },
      url: "https://images.pexels.com/photos/8989247/pexels-photo-8989247.jpeg",
    },
    {
      id: 90,
      name: "Tablet Bag",
      nameZh: "平板电脑包",
      description: {
        en: "Slim protective sleeve or bag for tablets, often padded for safety.",
        zh: "纤薄保护套或包，专为平板电脑设计，通常带衬垫。",
      },
      url: "https://res.cloudinary.com/drnascc38/image/upload/v1767512590/ee304f9f-d8fd-40aa-86c2-de30246c8647.png",
    },
    {
      id: 89,
      name: "Tool Bag",
      nameZh: "工具包",
      description: {
        en: "Durable bag for carrying and organizing various tools.",
        zh: "耐用包，用于携带和整理各种工具。",
      },
      url: "https://images.unsplash.com/photo-1604712941007-2627cfd759fd?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 102,
      name: "Headphone Bag",
      nameZh: "耳机包",
      description: {
        en: "Hard or soft case to protect and store headphones during travel.",
        zh: "硬壳或软包，用于旅行时保护和存放耳机。",
      },
      url: "https://res.cloudinary.com/drnascc38/image/upload/v1767019259/c96a9526-bdb1-41b2-99cb-573dce81596c.png",
    },
  ],
  materials: [
    "https://res.cloudinary.com/drnascc38/image/upload/v1768209487/f14efda2-8fb9-4160-b6ca-807ea4adaeee.png",
    "https://res.cloudinary.com/drnascc38/image/upload/v1768207590/762cfbc5-6aaf-4c2c-a36b-37cffcb2d1a9.png",
    "https://res.cloudinary.com/drnascc38/image/upload/v1768207543/3c6618b3-3e14-4304-b58f-ec9f5261d280.png",
    "https://res.cloudinary.com/drnascc38/image/upload/v1768207480/af63dde4-0c06-4836-9511-68d65a64b29f.png",
  ],
  colors: [
    "https://res.cloudinary.com/drnascc38/image/upload/v1768209759/c8967d4c-f304-4c43-b7c7-8fe8f78e00cb.png",
  ],
  logo: [
    "https://images.unsplash.com/photo-1618942660270-495c15c94bb0?auto=format&fit=crop&q=80&w=1200", // Embossed leather
    "https://images.pexels.com/photos/9588225/pexels-photo-9588225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Metal hardware
    "https://images.unsplash.com/photo-1631702046410-4e3d3e2c4038?auto=format&fit=crop&q=80&w=1200", // Embroidery closeup
    "https://images.pexels.com/photos/5698857/pexels-photo-5698857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Patch example
  ],
};

const GridImage = ({ src, alt, height = "h-64" }) => (
  <div
    className={`relative ${height} w-full rounded-xl overflow-hidden group cursor-pointer`}
  >
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition-transform duration-1000 group-hover:scale-110"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
    {/* <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> */}
  </div>
);

export default function BagManufacturerPage() {
  const { lang } = useLanguage();
  const isEn = lang === "en";
  const t = useMemo(
    () => ({
      hero: content.hero[isEn ? "en" : "zh"],
      process: content.process,
      bagTypes: content.bagTypes,
      materials: content.materials,
      colors: content.colors,
      logo: content.logo,
      order: content.order,
      about: content.about,
      button: content.button,
      button1: content.button1,
    }),
    [isEn]
  );

  const phone = "-----";
  const text = encodeURIComponent("Hello! I found you via my React app.");
  const url = `https://wa.me/${phone}?text=${text}`;

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 lg:py-48 bg-black text-white overflow-hidden">
        {/* Background Image Wrapper */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src={polishedImages.heroBg}
            alt="Premium factory overview"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 text-center max-w-6xl">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 tracking-tight leading-tight"
          >
            {t.hero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-6 md:mb-8 opacity-95"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-2xl md:max-w-4xl mx-auto mb-8 md:mb-12 leading-relaxed text-slate-200"
          >
            {t.hero.description}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex justify-center"
          >
            <Button
              size="xl"
              className="w-full sm:w-auto h-auto flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 px-8 py-6 md:px-10 md:py-6 bg-amber-600 hover:bg-amber-500   transition-all duration-300 group"
            >
              {/* Block 1: Contact Icon + Text */}
              <span className="flex items-center justify-center gap-2 md:gap-3">
                <Mail className="h-5 w-5 md:h-6 md:w-6 shrink-0" />
                <span className="font-bold tracking-wide">{t.hero.cta}</span>
              </span>

              {/* Visual Separator (Hidden on Mobile, Visible on Desktop) */}
              <span className="hidden md:block w-px h-5 bg-white/40 rounded-full" />

              {/* Block 2: Text + Arrow */}
              <span className="flex items-center justify-center gap-2 md:gap-3">
                <span className="font-medium opacity-90">{t.hero.cta2}</span>
                <ArrowRight className="h-5 w-5 md:h-6 md:w-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Customization Process */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-center mb-20 text-slate-800"
          >
            {t.process.title[isEn ? "en" : "zh"]}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {t.process.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative w-56 h-56 mb-8  overflow-hidden shadow-2xl border-8 border-amber-200 hover:border-amber-600 rounded">
                  <Image
                    src={step.imgUrl}
                    alt={step[isEn ? "en" : "zh"]}
                    fill
                    className="object-contain p-4"
                  />
                  {/* <Badge className="absolute top-4 left-4 text-2xl px-5 py-3 bg-amber-600">
                    {i + 1}
                  </Badge> */}
                </div>
                <p className="font-bold text-xl text-slate-800">
                  {step[isEn ? "en" : "zh"].split(". ")[1] ||
                    step[isEn ? "en" : "zh"]}
                </p>
                {i < t.process.steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-28 -right-12 text-amber-600 w-16 h-16" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Bag Types & Materials */}
      <section className="py-24 bg-slate-50">
        <div className="container max-w-7xl mx-auto px-6 space-y-4 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8 text-slate-800">
              {t.bagTypes.title[isEn ? "en" : "zh"]}
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              {t.bagTypes.description[isEn ? "en" : "zh"]}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {polishedImages.bags.map((bag, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <Card className="overflow-hidden transition-all duration-500 hover:-translate-y-2 border-none shadow-none hover:outline-4 outline hover:shadow-2xl hover:outline-amber-300 ">
                    {/* Smaller, tighter image container */}
                    <div className="relative aspect-8/5 overflow-hidden bg-slate-50">
                      <Image
                        src={bag.url}
                        alt={bag.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>

                    {/* Compact content */}
                    <CardContent className="p-2 text-center">
                      <h3 className="font-medium text-base text-slate-800 group-hover:text-amber-700 transition-colors duration-300">
                        {isEn ? bag.name : bag.nameZh}
                      </h3>
                      {isEn
                        ? bag.description.en
                        : bag.description.zh && (
                            <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                              {isEn ? bag.description.en : bag.description.zh}
                            </p>
                          )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="py-20"
          >
            <h2 className="text-4xl font-bold mb-8 text-slate-800">
              {t.materials.title[isEn ? "en" : "zh"]}
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              {t.materials.description[isEn ? "en" : "zh"]}
            </p>
            <div className="grid grid-cols-2 gap-6">
              {polishedImages.materials.map((src, i) => (
                <GridImage
                  key={i}
                  src={src}
                  alt={`Material ${i + 1}`}
                  height="h-64"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Colors & Logo */}
      <section className="py-20 max-w-7xl mx-auto">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold mb-8 text-slate-800">
              {t.colors.title[isEn ? "en" : "zh"]}
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              {t.colors.description[isEn ? "en" : "zh"]}
            </p>
          </motion.div>
          <div className="flex justify-center items-center h-fit">
            {polishedImages.colors.map((src, i) => (
              <div key={i} className="relative">
                <Image
                  src={src}
                  alt={`Color palette ${i + 1}`}
                  height={600}
                  width={800}
                  className="object-cover rounded-lg transition-transform duration-300 ease-in-out transform"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Order Notice */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-center mb-20 text-slate-800"
          >
            {t.order.title[isEn ? "en" : "zh"]}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {[
              {
                title: t.order.customization[isEn ? "en" : "zh"],
                items: t.order.items,
              },
              {
                title: t.order.delivery[isEn ? "en" : "zh"],
                text: t.order.deliveryText[isEn ? "en" : "zh"],
              },
              {
                title: t.order.payment[isEn ? "en" : "zh"],
                items: t.order.paymentItems,
              },
            ].map((section, idx) => (
              <Card
                key={idx}
                className="shadow-xl hover:shadow-2xl transition-shadow border-0 bg-white/90 backdrop-blur"
              >
                <CardHeader className="bg-linear-to-b from-amber-50 to-transparent">
                  <CardTitle className="text-2xl text-center text-slate-800">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-8">
                  {section.items ? (
                    <ul className="space-y-5">
                      {section.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center text-slate-700"
                        >
                          <Check className="mr-4 h-6 w-6 text-amber-600 shrink-0" />
                          <span className="text-lg">
                            {item[isEn ? "en" : "zh"]}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-2xl font-semibold text-amber-700">
                      {section.text}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About & CTA */}
      <section className="py-32 bg-gradient-to-br from-slate-950 via-amber-950 to-slate-950 text-white">
        <div className="container mx-auto px-6 text-center max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-12"
          >
            {t.about.title[isEn ? "en" : "zh"]}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl leading-relaxed mb-16 text-slate-200 max-w-4xl mx-auto"
          >
            {t.about.description[isEn ? "en" : "zh"]}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex flex-col md:flex-row gap-8 justify-center"
          >
            <Link
              href="/contact"
              className="text-xl px-5 py-2 flex rounded-2xl justify-center items-center bg-amber-600 hover:bg-amber-500 shadow-2xl"
            >
              <Phone className="mr-4 h-8 w-8" />
              {t.button.title[isEn ? "en" : "zh"]}
            </Link>
            <button
              className="text-xl px-5 py-2 flex rounded-2xl justify-center items-center bg-green-400 hover:bg-green-500 shadow-2xl"
              onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
              type="button"
            >
              <MessageCircle className="mr-4 h-8 w-8" />
              {t.button1.title[isEn ? "en" : "zh"]}
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
