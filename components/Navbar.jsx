"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function Navbar() {
  const { lang, toggleLang } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: "home", en: "Home", zh: "首页", href: "/" },
    { key: "products", en: "Products", zh: "产品", href: "/products" },
    { key: "gallery", en: "Gallery", zh: "画廊", href: "/gallery" },
    { key: "journey", en: "Journey", zh: "旅行", href: "/journey" },
    { key: "about", en: "About", zh: "关于", href: "/about" },
    { key: "contact", en: "Contact", zh: "联系我们", href: "/contact" },
  ];

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu = () => setIsMenuOpen(false);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-2xl bg-gray-50 overflow-x-clip">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8 min-w-0">
        {/* Left: Logo / Brand */}
        <div className="flex items-center gap-3 md:gap-8 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-2 min-w-0"
            onClick={closeMenu}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-800">
              <span className="text-white font-bold text-sm">logo</span>
            </div>

            {/* ✅ Hide brand text on small screens */}
            <div className="hidden sm:flex flex-col min-w-0">
              <span className="font-bold text-base sm:text-lg md:text-xl tracking-tight text-gray-900 truncate">
                {lang === "en" ? "HOUDE HANDBAG" : "HOUDE HANDBAG"}
              </span>
              <span className="text-xs text-gray-500 hidden md:block truncate">
                {lang === "en" ? "Premium Goods" : "优质皮革制品"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-amber-800 transition-colors relative group"
              >
                {lang === "en" ? item.en : item.zh}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-800 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Language Switch + CTA (desktop) + Menu (mobile) */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          {/* ✅ Language Switch ALWAYS in navbar (mobile + desktop) */}
          <div className="flex items-center space-x-1 border p-1 rounded-full bg-gray-50">
            <Label
              htmlFor="lang-switch"
              className={`text-[11px] cursor-pointer px-2 font-semibold ${
                lang === "zh" ? "text-amber-800" : "text-gray-500"
              }`}
            >
              中文
            </Label>
            <Switch
              id="lang-switch"
              checked={lang === "en"}
              onCheckedChange={toggleLang}
              className="scale-75 data-[state=checked]:bg-amber-800"
            />
            <Label
              htmlFor="lang-switch"
              className={`text-[11px] cursor-pointer px-2 font-semibold ${
                lang === "en" ? "text-amber-800" : "text-gray-500"
              }`}
            >
              EN
            </Label>
          </div>

          

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 " onClick={closeMenu} />
      )}

      {/* Mobile Drawer */}
      <div
        className={`md:hidden bg-gray-50 fixed top-16 right-0 z-50 h-[calc(100dvh-4rem)] w-[min(100vw,24rem)] shadow-lg transition-transform duration-300 ease-in-out will-change-transform overflow-hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <nav className="flex-1 overflow-y-auto overscroll-contain p-6">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex items-center justify-between py-4 px-2 text-base font-medium text-gray-700 hover:text-amber-800 hover:bg-gray-50 rounded-lg transition-colors border-b last:border-b-0"
                >
                  <span className="truncate pr-3">
                    {lang === "en" ? item.en : item.zh}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-400 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              ))}
            </div>

            
          </nav>

          <div className="shrink-0 p-6 border-t bg-gray-50">
            <div className="text-center text-sm text-gray-500">
              <p>
                {lang === "en"
                  ? "Consistent quality, precision manufacturing, and scalable production systems ensure reliable handbags that build lasting business relationships."
                  : "始终如一的品质、精密的制造工艺和可扩展的生产系统，确保了手袋的可靠性，从而建立持久的商业关系。"}
              </p>
              <p className="mt-2">© {new Date().getFullYear()} Houde Handbag</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
