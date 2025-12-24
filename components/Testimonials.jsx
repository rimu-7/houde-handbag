"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "./LanguageProvider";

export const TESTIMONIALS = {
  en: [
    {
      name: "Amina Rahman",
      role: "Brand Director, Retail",
      company: "LUXLINE",
      rating: 5,
      tag: "Top Quality",
      quote:
        "From sampling to bulk delivery, everything was consistent—stitching, edge paint, hardware, and packaging. The team was proactive, fast, and genuinely cared about the final product. Our repeat order rate jumped immediately.",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
    },
    {
      name: "Kenji Sato",
      role: "Founder",
      company: "KODO Studio",
      rating: 5,
      tag: "Premium Finish",
      quote:
        "The craftsmanship feels boutique-level. The fabric                                                                                                                                                                                                                                                                                                                                                                                            grain selection and lining details were exactly what we needed for a high-end launch. Communication was clear, timelines were realistic, and the results exceeded expectations.",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80",
    },
    {
      name: "Sophia Martinez",
      role: "Sourcing Manager",
      company: "ModernCarry",
      rating: 5,
      tag: "Reliable Partner",
      quote:
        "We’ve worked with many suppliers, but this one stands out: quality control is strict, updates are transparent, and the product photos match what arrives. It’s the first time our production process has felt smooth end-to-end.",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80",
    },
    {
      name: "Daniel Okoye",
      role: "Product Lead",
      company: "Urban Gear Co.",
      rating: 5,
      tag: "Great Communication",
      quote:
        "They caught issues before we did and offered smarter alternatives for materials and construction—without inflating costs. The final bags look and feel premium, and our customer feedback has been outstanding.",
      avatar:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80",
    },
  ],
  zh: [
    {
      name: "Amina Rahman",
      role: "零售品牌总监",
      company: "LUXLINE",
      rating: 5,
      tag: "卓越品质",
      quote:
        "从打样到批量交付，整体表现始终如一——走线、封边、五金和包装都非常稳定。团队响应积极、效率很高，并且真正在意最终成品的品质。我们的复购率也因此明显提升。",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
    },
    {
      name: "Kenji Sato",
      role: "创始人",
      company: "KODO Studio",
      rating: 5,
      tag: "高级质感",
      quote:
        "工艺水准很接近精品级别。皮料纹理的选择和内里细节完全符合我们高端发布的需求。沟通清晰、交期合理，最终效果超出预期。",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80",
    },
    {
      name: "Sophia Martinez",
      role: "采购经理",
      company: "ModernCarry",
      rating: 5,
      tag: "值得信赖",
      quote:
        "我们合作过不少供应商，但这家真的很突出：质检严格、进度透明，而且到货与产品图片一致。这是我们第一次感觉生产流程从头到尾都如此顺畅。",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80",
    },
    {
      name: "Daniel Okoye",
      role: "产品负责人",
      company: "Urban Gear Co.",
      rating: 5,
      tag: "沟通高效",
      quote:
        "他们经常比我们更早发现潜在问题，并主动提出更合理的材料与结构方案——而不是一味增加成本。成品的质感非常高级，客户反馈也非常好。",
      avatar:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80",
    },
  ],
};

const COPY = {
  en: {
    badge: "Testimonials",
    title: "What partners say after production",
    subtitle:
      "Premium quality, consistent QC, and fast communication—built for long-term brand partnerships.",
    verified: "Verified production partner",
    score: "5.0 / 5",
  },
  zh: {
    badge: "客户评价",
    title: "合作伙伴的真实反馈",
    subtitle: "高品质、稳定质检、沟通高效——为长期合作而打造。",
    verified: "已验证合作伙伴",
    score: "5.0 / 5",
  },
};

function Stars({ count = 5 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < count ? "fill-current" : ""}`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsCarousel() {
  const { lang } = useLanguage();

  const t = COPY[lang] ?? COPY.en;
  const list = TESTIMONIALS[lang] ?? TESTIMONIALS.en;

  const autoplay = React.useRef(
    Autoplay({
      delay: 4200,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  // ✅ real active index from embla API (works with shadcn Carousel)
  const [api, setApi] = React.useState(null);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => setActive(api.selectedScrollSnap());
    onSelect();

    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  return (
    <section className="relative w-full py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-amber-50/60 via-white to-white" />

      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col items-center text-center"
        >
          <Badge className="mb-3 rounded-full px-4 py-1">{t.badge}</Badge>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: true }}
            plugins={[autoplay.current]}
            className="w-full"
            onMouseLeave={() => autoplay.current?.reset()}
            onTouchEnd={() => autoplay.current?.reset()}
          >
            <CarouselContent className="py-2">
              {list.map((item, idx) => (
                <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="h-full"
                  >
                    <Card className="h-full overflow-hidden rounded-2xl border bg-white/80 backdrop-blur">
                      <CardContent className="flex h-full flex-col gap-5 p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-11 w-11">
                              <AvatarImage
                                src={item.avatar}
                                alt={item.name}
                              />
                              <AvatarFallback>
                                {item.name
                                  .split(" ")
                                  .slice(0, 2)
                                  .map((s) => s[0])
                                  .join("")
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>

                            <div className="min-w-0">
                              <div className="truncate text-sm font-semibold">
                                {item.name}
                              </div>
                              <div className="truncate text-xs text-muted-foreground">
                                {item.role} • {item.company}
                              </div>
                            </div>
                          </div>

                          
                        </div>
                        <motion.div
                            initial={{ opacity: 0, rotate: -8, y: -4 }}
                            whileInView={{ opacity: 1, rotate: 0, y: 0 }}
                            transition={{ duration: 0.45 }}
                            className="shrink-0 rounded-full border bg-white px-3 py-1 text-xs font-medium text-amber-900"
                          >
                            {item.tag}
                          </motion.div>

                        <div className="flex items-center justify-between">
                          <div className="text-amber-900">
                            <Stars count={item.rating} />
                          </div>
                          <Quote className="h-5 w-5 text-amber-800/60" />
                        </div>

                        <motion.p
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.2 }}
                          className="text-sm leading-relaxed text-gray-700"
                        >
                          “{item.quote}”
                        </motion.p>

                        <div className="mt-auto">
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
                          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                            <span>{t.verified}</span>
                            <span className="font-medium text-amber-900">
                              {t.score}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          {/* ✅ dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {list.map((_, i) => {
              const isActive = i === active;
              return (
                <motion.div
                  key={i}
                  className="h-2 rounded-full bg-amber-900/20"
                  animate={{
                    width: isActive ? 28 : 10,
                    opacity: isActive ? 1 : 0.6,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                />
              );
            })}
          </div>

          {/* ✅ infinite moving highlight strip */}
          <div className="pointer-events-none mt-10 overflow-hidden">
            <div className="relative mx-auto  px-4 py-3 backdrop-blur bg-linear-to-r from-amber-100/0 via-amber-200 to-amber-100/0">
              <motion.div
                className="flex w-max items-center gap-8 text-xs text-amber-900/80"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 18,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {Array.from({ length: 2 }).map((__, loopIdx) => (
                  <React.Fragment key={loopIdx}>
                    <span className="whitespace-nowrap">
                      {lang === "zh" ? "支持低起订量" : "Low MOQ options"}
                    </span>
                    <span className="whitespace-nowrap">
                      {lang === "zh" ? "优质皮料供应" : "Premium sourcing"}
                    </span>
                    <span className="whitespace-nowrap">
                      {lang === "zh" ? "严格质检流程" : "Strict QC checkpoints"}
                    </span>
                    <span className="whitespace-nowrap">
                      {lang === "zh" ? "定制品牌与包装" : "Custom branding & packaging"}
                    </span>
                    <span className="whitespace-nowrap">
                      {lang === "zh" ? "重视准时交付" : "On-time delivery focus"}
                    </span>
                    <span className="whitespace-nowrap">
                      {lang === "zh" ? "快速打样" : "Fast sampling turnaround"}
                    </span>
                  </React.Fragment>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
