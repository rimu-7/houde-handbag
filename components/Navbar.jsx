"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 1. Import pathname hook
import { useLanguage } from "@/components/LanguageProvider";
import { ChevronRight, Menu, X } from "lucide-react";
import { motion } from "framer-motion"; // 2. Import Framer Motion

export default function Navbar() {
  const { lang, toggleLang } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // 3. Get current path

  const navItems = [
    { key: "home", en: "Home", zh: "首页", href: "/" },
    { key: "products", en: "Products", zh: "产品", href: "/products" },
    { key: "gallery", en: "Gallery", zh: "画廊", href: "/gallery" },
    { key: "journey", en: "Journey", zh: "旅行", href: "/journey" },
    { key: "OEM/ODM", en: "OEM/ODM", zh: "OEM/ODM", href: "/oem-odm" },
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
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-2xl bg-white/90 overflow-x-clip h-16">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8 min-w-0">
        {/* Left: Logo / Brand */}
        <div className="flex items-center gap-3 md:gap-8 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-2 min-w-0"
            onClick={closeMenu}
          >
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
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`relative text-sm font-medium transition-colors py-2 ${
                    isActive ? "text-amber-800" : "text-gray-700 hover:text-amber-800"
                  }`}
                >
                  {lang === "en" ? item.en : item.zh}
                  
                  {/* Active Indicator (Bottom Bar) */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-800"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover Indicator (Subtle background fade or extra line) */}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-800/50 transition-all duration-300 group-hover:w-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Language Switch + CTA (desktop) + Menu (mobile) */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
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

          {/* Mobile Menu Button - Kept visible because drawer is now top-16 */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors z-50"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-30 bg-black/20 backdrop-blur-sm" 
          onClick={closeMenu} 
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`md:hidden bg-white fixed left-0 right-0 z-40 w-full shadow-lg transition-transform duration-300 ease-in-out will-change-transform overflow-hidden
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
        // 4. FIX: Positioned at top-16 (height of navbar) so the X button remains visible above
        style={{ top: "4rem", height: "calc(100vh - 4rem)" }}
      >
        <div className="flex flex-col h-full">
          <nav className="flex-1 overflow-y-auto overscroll-contain p-6">
            <div className="space-y-1">
              {navItems.map((item) => {
                 const isActive = pathname === item.href;
                 return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={closeMenu}
                    className={`flex items-center justify-between py-4 px-2 text-base font-medium rounded-lg transition-colors border-b last:border-b-0
                      ${isActive 
                        ? "text-amber-800 bg-amber-50" 
                        : "text-gray-700 hover:text-amber-800 hover:bg-gray-50"
                      }`}
                  >
                    <span className="truncate pr-3">
                      {lang === "en" ? item.en : item.zh}
                    </span>
                    {isActive ? (
                       <div className="h-2 w-2 rounded-full bg-amber-800" />
                    ) : (
                       <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>
          
          <div className="shrink-0 p-6 border-t bg-gray-50">
            <div className="text-center text-sm text-gray-500">
              <p>
                {lang === "en"
                  ? "Consistent quality, precision manufacturing, and scalable production systems."
                  : "始终如一的品质、精密的制造工艺和可扩展的生产系统。"}
              </p>
              <p className="mt-2">
                © {new Date().getFullYear()} Houde Handbag
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}