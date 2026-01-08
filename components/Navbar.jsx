"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { lang, toggleLang } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { key: "home", en: "Home", zh: "首页", href: "/" },
    { key: "products", en: "Products", zh: "产品", href: "/products" },
    { key: "gallery", en: "Gallery", zh: "画廊", href: "/gallery" },
    { key: "journey", en: "Journey", zh: "旅行", href: "/journey" },
    { key: "OEM/ODM", en: "OEM/ODM", zh: "OEM/ODM", href: "/oem-odm" },
    { key: "about", en: "About", zh: "关于", href: "/about" },
    { key: "contact", en: "Contact", zh: "联系我们", href: "/contact" },
  ];

  // 1. Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // 2. Close mobile menu automatically when path changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white h-16">
      <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-8">
        {/* --- Logo --- */}
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="flex flex-col z-50"
        >
          <span className="font-bold text-lg hover:text-amber-700 hover:scale-110 duration-300 tracking-tight text-gray-900">
            
             {lang === "en" ? "HOUDE HANDBAG" : "厚德手提包"}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-gray-500">
            {lang === "en" ? "Premium Goods" : "优质皮革制品"}
          </span>
        </Link>

        {/* --- Desktop Nav --- */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`text-sm font-medium  ${
                  isActive
                    ? "text-white bg-amber-800 px-2 py-1 rounded-2xl"
                    : "text-gray-600 hover:text-amber-800"
                }`}
              >
                {lang === "en" ? item.en : item.zh}
              </Link>
            );
          })}
        </nav>

        {/* --- Controls (Lang + Mobile Toggle) --- */}
        <div className="flex items-center gap-4 z-50">
          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
            <span
              className={`text-[10px] font-bold ${
                lang === "zh" ? "text-amber-800" : "text-gray-400"
              }`}
            >
              中
            </span>
            <Switch
              checked={lang === "en"}
              onCheckedChange={toggleLang}
              className="data-[state=checked]:bg-amber-800 scale-75"
            />
            <span
              className={`text-[10px] font-bold ${
                lang === "en" ? "text-amber-800" : "text-gray-400"
              }`}
            >
              EN
            </span>
          </div>

          {/* Hamburger Button */}
          <button
            className="md:hidden text-gray-700 hover:text-amber-800 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- Mobile Menu (Instant Toggle) --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-white border-t border-gray-100 md:hidden overflow-y-auto">
          <div className="flex flex-col p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`py-4 border-b border-gray-50 text-lg font-medium ${
                    isActive ? "text-amber-800" : "text-gray-600"
                  }`}
                >
                  {lang === "en" ? item.en : item.zh}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
