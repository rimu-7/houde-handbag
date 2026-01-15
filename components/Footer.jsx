"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider"; // Adjust path if needed
import { memo, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
} from "lucide-react";

// --- 1. DATA SOURCE (Based on your prompt) ---
const FOOTER_DATA = {
  en: {
    footer: {
      brand: {
        logoText: "HB",
        name: "HouDe Handbag",
        tagline: "Manufacturing • OEM/ODM • Custom Branding",
        desc: "Consistent quality, precision manufacturing, and scalable production systems ensure reliable handbags that build lasting business relationships.",
      },
      social: { instagram: "#", facebook: "#", linkedin: "#" },
      cols: {
        company: {
          title: "Company",
          about: "About",
          products: "Products",
          factory: "Business",
          contact: "Contact",
        },
        contact: { title: "Contact" }, // Fallback if needed
      },
      contact: {
        title: "Contact",
        address:
          "Building 5, No. 316, Houjie Section, Guantai Road, Qiaotou First Industrial Zone, Houjie Town, Dongguan City, Guangdong Province",
        address2:
          "HAUDE Co., Ltd. 288/1A, Binh Duong Avenue, Thanh Hoa B Town, An Thanh Ward, Thuan An City, Binh Duong Province, Vietnam",
        phoneRaw: "0889577786",
        phoneRaw2: "0789960888",
        phone: "+8613829146199",
        email: "houde.bag@shunbox.com",
        email2: "farhan@houdebag.com",
      },
      newsletter: {
        title: "Get Updates",
        placeholder: "Email address",
        note: "No spam. Only product updates & factory news.",
        button: "Subscribe",
      },
      bottom: {
        rights: "All rights reserved.",
        terms: "Terms",
        privacy: "Privacy",
        cookies: "Cookies",
      },
    },
  },
  zh: {
    footer: {
      brand: {
        logoText: "HB",
        name: "厚德手提包",
        tagline: "制造工厂 • OEM/ODM • 定制品牌",
        desc: "始终如一的品质、精密的制造工艺和可扩展的生产系统，确保了手袋的可靠性，从而建立持久的商业关系。",
      },
      social: { instagram: "#", facebook: "#", linkedin: "#" },
      cols: {
        company: {
          title: "公司",
          about: "关于我们",
          products: "产品",
          factory: "业务合作",
          contact: "联系我们",
        },
        contact: { title: "接触" },
      },
      contact: {
        title: "联系方式",
        address: "广东省东莞市厚街镇桥头第一工业区莞太路厚街段316号5号楼",
        address2:
          "HAUDE Co., Ltd. 288/1A, Binh Duong Avenue, Thanh Hoa B Town, An Thanh Ward, Thuan An City, Binh Duong Province, Vietnam",
        phoneRaw: "0889577786",
        phoneRaw2: "0789960888",
        phone: "13829146199",
        email: "houde.bag@shunbox.com",
        email2: "farhan@houdebag.com",
      },
      newsletter: {
        title: "订阅更新",
        placeholder: "请输入邮箱",
        note: "不发送垃圾邮件，只推送产品与工厂动态。",
        button: "订阅",
      },
      bottom: {
        rights: "版权所有",
        terms: "条款",
        privacy: "隐私",
        cookies: "Cookies",
      },
    },
  },
};

// --- Sub-Components ---

const SocialButton = memo(({ href, label, icon: Icon }) => (
  <Button
    variant="ghost"
    size="icon"
    className="h-9 w-9 rounded-full bg-muted/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300"
    asChild
    aria-label={label}
  >
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Icon className="h-4 w-4" />
    </a>
  </Button>
));
SocialButton.displayName = "SocialButton";

const FooterHeading = ({ children }) => (
  <h3 className="font-semibold text-foreground tracking-tight text-base mb-6">
    {children}
  </h3>
);

const ContactItem = ({ icon: Icon, href, children, label }) => (
  <li className="flex items-center text-sm text-muted-foreground group">
    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted/50 group-hover:bg-primary/10 transition-colors">
      <Icon className="h-3 w-3 text-primary" />
    </div>
    <div className="flex flex-col">
      {label && (
        <span className="text-xs font-medium text-foreground mb-0.5">
          {label}
        </span>
      )}
      {href ? (
        <a
          href={href}
          className="hover:text-primary transition-colors duration-200 leading-relaxed break-all"
        >
          {children}
        </a>
      ) : (
        <span className="leading-relaxed">{children}</span>
      )}
    </div>
  </li>
);

// --- Loading State ---
export function FooterSkeleton() {
  return (
    <footer className="border-t bg-background/50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-6 w-24" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

// --- Main Component ---
export default function Footer() {
  // 1. Get utilities from your Provider
  const { lang, mounted, t } = useLanguage();
  const year = useMemo(() => new Date().getFullYear(), []);

  const f = useMemo(() => {
    return lang === "en" ? FOOTER_DATA.en.footer : FOOTER_DATA.zh.footer;
  }, [lang]);

  if (!mounted) return <FooterSkeleton />;

  return (
    <footer className="bg-zinc-50 border-t border-zinc-200" role="contentinfo">
      <div className="container mx-auto px-4 md:px-6 py-16 lg:py-20">
        {/* --- Top Grid Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16">
          {/* Col 1: Brand Identity (Spans 4 cols on Desktop) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-2">
                <div>
                  <span className="block uppercase text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {f.brand.name}
                  </span>
                </div>
              </div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium mt-1 block">
                {f.brand.tagline}
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              {f.brand.desc}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <SocialButton
                href={f.social.instagram}
                label="Instagram"
                icon={Instagram}
              />
              <SocialButton
                href={f.social.facebook}
                label="Facebook"
                icon={Facebook}
              />
              <SocialButton
                href={f.social.linkedin}
                label="LinkedIn"
                icon={Linkedin}
              />
            </div>
            <div className="pt-4 border-t border-zinc-200/60">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                  <Clock className="h-3 w-3" />
                </div>
                <div>
                  <span className="block font-medium text-foreground mb-0.5">
                    {t("Business Hours", "营业时间")}
                  </span>
                  <span>
                    {t(
                      "Mon - Sat: 8:00 AM - 6:00 PM",
                      "周一至周六：上午 8:00 - 下午 6:00"
                    )}
                  </span>
                  <span className="block text-xs mt-0.5">
                    {t("Sunday: Closed", "周日：休息")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links (Spans 2 cols on Desktop) */}
          <div className="lg:col-span-2">
            <FooterHeading>{f.cols.company.title}</FooterHeading>
            <ul className="space-y-3">
              {[
                { href: "/about", label: f.cols.company.about },
                { href: "/products", label: f.cols.company.products },
                { href: "/business", label: f.cols.company.factory },
                { href: "/contact", label: f.cols.company.contact },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span className="h-1 w-1 rounded-full bg-zinc-300 group-hover:bg-primary transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Info (Spans 3 cols on Desktop) */}
          <div className="lg:col-span-3">
            <FooterHeading>{f.contact.title}</FooterHeading>
            <ul className="space-y-4">
              {/* Phones - Using t() for labels not in your data */}

              {/* Emails */}
              <ContactItem icon={Mail} href={`mailto:${f.contact.email}`}>
                {f.contact.email}
              </ContactItem>
              <ContactItem icon={Mail} href={`mailto:${f.contact.email2}`}>
                {f.contact.email2}
              </ContactItem>
            </ul>
          </div>

          {/* Col 4: Locations & Newsletter (Spans 3 cols on Desktop) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Locations */}
            <div>
              <FooterHeading>{t("Locations", "地址")}</FooterHeading>
              <ul className="space-y-5">
                <ContactItem icon={MapPin}>
                  <span className="block font-medium text-foreground text-xs mb-1">
                    {t("China Factory", "中国工厂")}
                  </span>
                  {f.contact.address}
                </ContactItem>
                <ContactItem icon={MapPin}>
                  <span className="block font-medium text-foreground text-xs mb-1">
                    {t("Vietnam Factory", "越南工厂")}
                  </span>
                  {f.contact.address2}
                </ContactItem>
              </ul>
            </div>

            {/* Business Hours - Not in your JSON, so manually handled via t() */}
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className="mt-12 pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>
            © {year} {f.brand.name}. {f.bottom.rights}
          </p>
          <div className="flex gap-6">
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              {f.bottom.terms}
            </Link>
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              {f.bottom.privacy}
            </Link>
            <Link
              href="/cookies"
              className="hover:text-foreground transition-colors"
            >
              {f.bottom.cookies}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
