"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, Phone, Mail, Send, Loader2, ArrowRight } from "lucide-react";
import { Toaster, toast } from "sonner";

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

// Validation
const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  inquiry: z.string().min(10),
});

// WhatsApp Icon
const WhatsAppIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);

  const { lang } = useLanguage();

  // This will re-compute every time lang changes → fully reactive!
  const t = contactData[lang] || contactData.en;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", inquiry: "" },
  });

  async function onSubmit(values) {
    setIsLoading(true);

    const promise = fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    });

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

  // Load Leaflet + GaoDe Map (no key, works great in China)
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
      script.onerror = () => console.error("Failed to load:", src);
      document.body.appendChild(script);
    };

    loadCSS("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");
    loadScript("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js", () => {
      setMapLoaded(true);
      initMap();
    });
  }, [mapLoaded]);

  const initMap = () => {
    if (!mapRef.current || !window.L) return;

    const sat = window.L.tileLayer(
      "https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
      { subdomains: "1234", maxZoom: 18 }
    );
    const road = window.L.tileLayer(
      "https://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}",
      { subdomains: "1234", maxZoom: 18 }
    );

    const map = window.L.map(mapRef.current, {
      center: [22.9448, 113.6715],
      zoom: 17,
      layers: [sat, road],
      zoomControl: true,
    });

    window.L.marker([22.9448, 113.6715])
      .addTo(map)
      .bindPopup(
        `
        <strong>HOUDE HANDBAG</strong><br/>
        广东省东莞市厚街镇桥头第一工业区<br/>
        莞太路厚街段316号5号楼<br/><br/>
        Building 5, No. 316 Wantai Road<br/>
        Qiaotou First Industrial Zone, Houjie Town<br/>
        Dongguan, Guangdong, China
      `
      )
      .openPopup();

    setTimeout(() => map.invalidateSize(), 200);
  };

  return (
    <>
      <div className="min-h-screen bg-white text-slate-900 font-sans">
        {/* Hero */}
        <section className="pt-24 px-6 pb-16  bg-linear-to-b from-amber-50/80 to-white">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              {t.hero.badge}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {t.hero.titleStart}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600">
                {t.hero.titleHighlight}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-2 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{t.contact.title}</h3>
                <p className="text-slate-500">{t.contact.subtitle}</p>
              </div>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                className="block group"
              >
                <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-100 hover:bg-emerald-100/80 transition-all flex items-center gap-5">
                  <div className="bg-white p-3 rounded-2xl text-emerald-600 shrink-0">
                    <WhatsAppIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg group-hover:text-emerald-800 transition-colors">
                      {t.contact.whatsapp.title}
                    </h4>
                    <p className="text-emerald-700/80 text-sm">
                      {t.contact.whatsapp.sub}
                    </p>
                  </div>
                  <ArrowRight className="ml-auto w-5 h-5 text-emerald-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </a>

              {/* Email */}
              <div>
                <div
                  className="p-6 rounded-3xl bg-amber-50 border border-amber-100 hover:bg-amber-100/80 transition-all flex items-center gap-5"
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText("osksv");
                    toast.success("WeChat ID copied!");
                  }}
                >
                  <div className="shrink-0">
                    <div
                      className="flex items-center justify-center w-14 h-14 bg-[#10b981] rounded-2xl text-white transition-opacity hover:opacity-90 cursor-pointer"
                      aria-label="WeChat button"
                    >
                      <svg
                        className="w-10 h-10 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="WeChat"
                      >
                        <title>WeChat social icon</title>
                        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg group-hover:text-amber-800 transition-colors">
                      Wechat / 微信
                    </h4>
                    <p className="text-amber-700/80 text-sm">
                      点击复制微信ID / click to copy
                    </p>
                  </div>
                  <ArrowRight className="ml-auto w-5 h-5 text-amber-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </div>

              {/* Phone */}
              <a href="tel:+8613829146199" className="block group">
                <div className="p-6 rounded-3xl bg-sky-50 border border-sky-100 hover:bg-sky-100/80 transition-all flex items-center gap-5">
                  <div className="bg-white p-3 rounded-2xl text-sky-600 shrink-0">
                    <Phone className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg group-hover:text-sky-800 transition-colors">
                      {t.contact.phone.title}
                    </h4>
                    <p className="text-sky-700/80 text-sm">
                      {t.contact.phone.sub}
                    </p>
                  </div>
                  <ArrowRight className="ml-auto w-5 h-5 text-sky-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </a>

              {/* Address */}
              <div className="pt-6 mt-6 border-t border-slate-100">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 text-amber-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900 mb-2">
                      {t.contact.addressLabel}
                    </p>
                    <p className="text-sm font-medium text-slate-700">
                      广东省东莞市厚街镇桥头第一工业区莞太路厚街段316号5号楼
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                      Building 5, No. 316 Wantai Road, Qiaotou First Industrial
                      Zone,
                      <br />
                      Houjie Town, Dongguan City, Guangdong, China
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-7">
              <div className="bg-slate-50 rounded-[2rem] p-2 md:p-10 border border-slate-100">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold">{t.form.title}</h3>
                  <p className="text-slate-500 mt-2">{t.form.subtitle}</p>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.form.nameLabel}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t.form.namePlaceholder}
                                {...field}
                                className="bg-white h-12 rounded-xl"
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
                            <FormLabel>{t.form.emailLabel}</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder={t.form.emailPlaceholder}
                                {...field}
                                className="bg-white h-12 rounded-xl"
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
                          <FormLabel>{t.form.messageLabel}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t.form.messagePlaceholder}
                              className="bg-white min-h-[180px] rounded-xl resize-none"
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
                      className="w-full h-12 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-lg font-medium"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {t.form.loading}
                        </>
                      ) : (
                        <>
                          {t.form.submitButton}
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <section className="w-full px-2 pb-20">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">
              {lang === "en" ? "Our Location" : "工厂位置"}
            </h3>
            <div
              ref={mapRef}
              className="w-full h-96 md:h-[520px] rounded-3xl overflow-hidden  border border-slate-200"
            >
              {!mapLoaded && (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4 text-amber-600" />
                    <p className="text-lg text-gray-600">Loading map...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
