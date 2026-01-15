"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  MapPin,
  Phone,
  Send,
  Loader2,
  ArrowRight,
  Factory,
  CheckCircle2,
  Copy,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/components/LanguageProvider";
import { contactData } from "@/lib/dictionary/contactData";

// --- VALIDATION SCHEMA ---
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  inquiry: z.string().min(10, "Message must be at least 10 characters"),
});

// --- LOCATIONS DATA (Updated for dynamic switching) ---
const LOCATIONS = {
  china: {
    id: "china",
    coords: [22.9448, 113.6715],
    name: {
      en: "Dongguan Factory",
      zh: "东莞工厂",
    },
    address: {
      en: "Building 5, No. 316 Wantai Road, Qiaotou First Industrial Zone, Houjie Town, Dongguan, Guangdong, China",
      zh: "广东省东莞市厚街镇桥头第一工业区莞太路厚街段316号5号楼",
    },
  },
  vietnam: {
    id: "vietnam",
    coords: [10.9805, 106.6968],
    name: {
      en: "Vietnam Factory",
      zh: "越南工厂 ",
    },
    address: {
      en: "HAUDE Co., Ltd. 288/1A, Binh Duong Avenue, Thanh Hoa B Town, An Thanh Ward, Thuan An City, Binh Duong Province, Vietnam",
      zh: "HAUDE Co., Ltd. 288/1A, Binh Duong Avenue, Thanh Hoa B Town, An Thanh Ward, Thuan An City, Binh Duong Province, Vietnam",
    },
  },
};

// --- CUSTOM ICONS ---
const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const WeChatIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
  </svg>
);

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeLocation, setActiveLocation] = useState("china");
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  // Get current language from your context
  const { lang } = useLanguage();
  const t = contactData[lang] || contactData.en;

  // Helper to get text based on language (default to Chinese if not 'en')
  const isEn = lang === "en";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", inquiry: "" },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    const promise = new Promise((resolve) => setTimeout(resolve, 1500));
    toast.promise(promise, {
      loading: t.form.loading,
      success: () => {
        form.reset();
        setIsLoading(false);
        return t.form.success;
      },
      error: () => {
        setIsLoading(false);
        return t.form.error;
      },
    });
  }

  // --- MAP INIT ---
  useEffect(() => {
    if (mapLoaded || typeof window === "undefined") return;

    const loadCSS = (href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    };

    const loadScript = (src, callback) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = callback;
      document.body.appendChild(script);
    };

    loadCSS("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");
    loadScript("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js", () => {
      setMapLoaded(true);
      initMap();
    });
  }, [mapLoaded]);

  const initMap = () => {
    if (!mapRef.current || !window.L || mapInstance.current) return;

    const sat = window.L.tileLayer(
      "https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
      { subdomains: "1234", maxZoom: 18 }
    );
    const road = window.L.tileLayer(
      "https://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}",
      { subdomains: "1234", maxZoom: 18 }
    );

    const map = window.L.map(mapRef.current, {
      center: LOCATIONS.china.coords,
      zoom: 15,
      layers: [sat, road],
      zoomControl: false,
      scrollWheelZoom: false,
    });

    window.L.control.zoom({ position: "bottomright" }).addTo(map);

    const customIcon = window.L.divIcon({
      className: "custom-marker",
      html: `<div style="background-color: #d97706; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3);"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    Object.values(LOCATIONS).forEach((loc) => {
      // For popup, we show English address by default for broad compatibility,
      // or you can make this dynamic too if you pass 'lang' into this effect carefully.
      window.L.marker(loc.coords, { icon: customIcon })
        .addTo(map)
        .bindPopup(`<strong>${loc.name.en}</strong><br/>${loc.address.en}`);
    });

    mapInstance.current = map;
  };

  useEffect(() => {
    if (mapInstance.current && mapLoaded) {
      const loc = LOCATIONS[activeLocation];
      mapInstance.current.flyTo(loc.coords, 16, { duration: 2 });
    }
  }, [activeLocation, mapLoaded]);

  return (
    <>
      <div className="min-h-screen bg-slate-50 font-sans">
        {/* Hero Section */}
        <section className="pt-28 pb-16 px-6 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm font-medium border border-amber-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              {t.hero.badge}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              {t.hero.titleStart}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                {t.hero.titleHighlight}
              </span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-5 space-y-2">
              {/* Channels */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-amber-500" />{" "}
                  {isEn ? "Contact Channels" : "联系方式"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/+8619823276069`}
                    target="_blank"
                    rel="noreferrer"
                    className="group p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-green-100 p-2 rounded-lg text-emerald-600">
                        <WhatsAppIcon className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-slate-700 group-hover:text-emerald-700">
                        WhatsApp
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 pl-1">
                      {t.contact.whatsapp.sub}
                    </p>
                  </a>

                  {/* WeChat */}
                  <div
                    onClick={() => {
                      navigator.clipboard.writeText("H13829146199");
                      toast.success(
                        isEn ? "WeChat ID copied!" : "微信ID已复制!"
                      );
                    }}
                    className="cursor-pointer group p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-200 transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-green-100 p-2 rounded-lg text-green-600">
                        <WeChatIcon className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-slate-700 group-hover:text-green-600">
                         {isEn ? "WeChat" : "微信"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 pl-1 flex items-center gap-1">
                      <Copy className="w-3 h-3" />{" "}
                      {isEn ? "Tap to copy" : "点击复制"}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <a href="tel:0769-85825562" className="block group">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-200 transition-all flex items-center gap-4">
                    <div className="bg-sky-50 p-2.5 rounded-lg text-sky-600">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 group-hover:text-sky-700 transition-colors">
                        {t.contact.phone.title}
                      </h4>
                      <p className="text-slate-400 text-xs">
                        {isEn
                          ? "Mon-Sat 9am-6pm (GMT+8)"
                          : "周一至周六 9:00-18:00"}
                      </p>
                    </div>
                    <ArrowRight className="ml-auto w-4 h-4 text-slate-300 group-hover:text-sky-500 transition-colors" />
                  </div>
                </a>
              </div>

              {/* LOCATIONS SECTION */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-500" />{" "}
                  {isEn ? "Our Locations" : "工厂地址"}
                </h3>
                <div className="space-y-3">
                  {/* China Card */}
                  <div
                    onClick={() => setActiveLocation("china")}
                    className={cn(
                      "cursor-pointer p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden",
                      activeLocation === "china"
                        ? "bg-amber-50/50 border-amber-500 ring-1 ring-amber-500 shadow-md"
                        : "bg-white border-slate-200 hover:border-amber-200 hover:shadow-sm"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2"></div>
                      {activeLocation === "china" && (
                        <CheckCircle2 className="w-5 h-5 text-amber-500" />
                      )}
                    </div>
                    {/* DYNAMIC NAME & ADDRESS */}
                    <h4 className="text-lg font-bold text-slate-900 mb-1">
                      {isEn ? LOCATIONS.china.name.en : LOCATIONS.china.name.zh}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {isEn
                        ? LOCATIONS.china.address.en
                        : LOCATIONS.china.address.zh}
                    </p>
                  </div>

                  {/* Vietnam Card */}
                  <div
                    onClick={() => setActiveLocation("vietnam")}
                    className={cn(
                      "cursor-pointer p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden",
                      activeLocation === "vietnam"
                        ? "bg-amber-50/50 border-amber-500 ring-1 ring-amber-500 shadow-md"
                        : "bg-white border-slate-200 hover:border-amber-200 hover:shadow-sm"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2"></div>
                      {activeLocation === "vietnam" && (
                        <CheckCircle2 className="w-5 h-5 text-amber-500" />
                      )}
                    </div>
                    {/* DYNAMIC NAME & ADDRESS */}
                    <h4 className="text-lg font-bold text-slate-900 mb-1">
                      {isEn
                        ? LOCATIONS.vietnam.name.en
                        : LOCATIONS.vietnam.name.zh}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {isEn
                        ? LOCATIONS.vietnam.address.en
                        : LOCATIONS.vietnam.address.zh}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {t.form.title}
                  </h3>
                  <p className="text-slate-500 mt-2">{t.form.subtitle}</p>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700">
                              {t.form.nameLabel}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t.form.namePlaceholder}
                                {...field}
                                className="bg-slate-50 border-slate-200 focus:bg-white h-12 rounded-xl transition-all"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700">
                              {t.form.emailLabel}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder={t.form.emailPlaceholder}
                                {...field}
                                className="bg-slate-50 border-slate-200 focus:bg-white h-12 rounded-xl transition-all"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="inquiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700">
                            {t.form.messageLabel}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t.form.messagePlaceholder}
                              className="bg-slate-50 border-slate-200 focus:bg-white min-h-[180px] rounded-xl resize-none transition-all"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-14 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-lg font-semibold shadow-lg shadow-amber-600/20 transition-all transform active:scale-[0.98]"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {t.form.loading}
                        </>
                      ) : (
                        <>
                          {t.form.submitButton}
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Map Section */}
        <section className="w-full h-[500px] md:h-[600px] relative border-t border-slate-200 bg-slate-100">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[400] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-slate-200 text-sm font-medium text-slate-600 pointer-events-none">
            {isEn ? "Viewing: " : "当前位置: "}
            <span className="text-amber-600 font-bold">
              {activeLocation === "china"
                ? isEn
                  ? "Dongguan HQ"
                  : "东莞总部"
                : isEn
                ? "Vietnam Branch"
                : "越南分部"}
            </span>
          </div>

          <div ref={mapRef} className="w-full h-full z-0">
            {!mapLoaded && (
              <div className="w-full h-full flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-slate-400" />
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
