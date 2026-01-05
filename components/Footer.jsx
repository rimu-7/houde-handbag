"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
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
  ArrowRight,
} from "lucide-react";

// --- Constants ---
const SOCIAL_LINKS = {
  INSTAGRAM: "https://instagram.com/bagworks",
  FACEBOOK: "https://facebook.com/bagworks",
  LINKEDIN: "https://linkedin.com/company/bagworks",
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
  <li className="flex items-start gap-3 text-sm text-muted-foreground group">
    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted/50 group-hover:bg-primary/10 transition-colors">
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
          className="hover:text-primary transition-colors duration-200 leading-relaxed"
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
  const { dict, isLoading: languageLoading } = useLanguage();
  const f = dict?.footer || {};
  const year = useMemo(() => new Date().getFullYear(), []);

  // Consolidating data logic
  const data = useMemo(
    () => ({
      brand: {
        name: f?.brand?.name || "BagWorks",
        tagline: f?.brand?.tagline || "Premium OEM/ODM Manufacturing",
        desc:
          f?.brand?.desc ||
          "We combine traditional craftsmanship with modern manufacturing to deliver exceptional bag products for global brands.",
      },
      links: [
        { href: "/about", label: f?.cols?.company?.about || "About Us" },
        {
          href: "/products",
          label: f?.cols?.company?.products || "Our Products",
        },
        {
          href: "/business",
          label: f?.cols?.company?.factory || "Factory Tour",
        },
        { href: "/contact", label: f?.cols?.company?.contact || "Contact Us" },
      ],
      social: {
        instagram: f?.social?.instagram || SOCIAL_LINKS.INSTAGRAM,
        facebook: f?.social?.facebook || SOCIAL_LINKS.FACEBOOK,
        linkedin: f?.social?.linkedin || SOCIAL_LINKS.LINKEDIN,
      },
      contact: {
        phones: [
          {
            label: "Qilin (Vietnam)",
            val: f?.contact?.phoneRaw || "0889577786",
            href: `tel:${f?.contact?.phoneRaw}`,
          },
          {
            label: "Ms李 （Vietnam)",
            val: f?.contact?.phoneRaw2 || "0789960888",
            href: `tel:${f?.contact?.phoneRaw2}`,
          },
          {
            label: "Ms李 （Vietnam)",
            val: f?.contact?.phone || "8613829146199",
            href: `tel:${f?.contact?.phone}`,
          },
        ],
        emails: [
          {
            label: " ",
            val: f?.contact?.email || "info@bagworks.com",
            href: `mailto:${f?.contact?.email}`,
          },
          {
            label: " ",
            val: f?.contact?.email2 || "support@bagworks.com",
            href: `mailto:${f?.contact?.email2}`,
          },
        ],
        address1:
          f?.contact?.address ||
          "Building A, Innovation Park, Guangzhou, China",
        address2:
          f?.contact?.address2 || "Building B, Logistics Hub, Shenzhen, China",
      },
      legal: {
        rights: f?.bottom?.rights || "All rights reserved.",
        terms: f?.bottom?.terms || "Terms & Conditions",
        privacy: f?.bottom?.privacy || "Privacy Policy",
      },
    }),
    [f]
  );

  if (languageLoading) return <FooterSkeleton />;

  return (
    <footer className="bg-zinc-50 border-t border-zinc-200" role="contentinfo">
      <div className="container mx-auto px-4 md:px-6 py-16 lg:py-20">
        {/* --- Top Grid Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16">
          {/* Col 1: Brand Identity (Spans 4 cols on Desktop) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block group">
              <span className="block text-xl hover:text-amber-800 duration-300 font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {data.brand.name}
              </span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                {data.brand.tagline}
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              {data.brand.desc}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <SocialButton
                href={data.social.instagram}
                label="Instagram"
                icon={Instagram}
              />
              <SocialButton
                href={data.social.facebook}
                label="Facebook"
                icon={Facebook}
              />
              <SocialButton
                href={data.social.linkedin}
                label="LinkedIn"
                icon={Linkedin}
              />
            </div>
          </div>

          {/* Col 2: Quick Links (Spans 2 cols on Desktop) */}
          <div className="lg:col-span-2">
            <FooterHeading>
              {f?.cols?.company?.title || "Company"}
            </FooterHeading>
            <ul className="space-y-3">
              {data.links.map((link) => (
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

          {/* Col 3: Get in Touch (Spans 3 cols on Desktop) */}
          <div className="lg:col-span-3">
            <FooterHeading>{f?.contact?.title || "Get in Touch"}</FooterHeading>
            <ul className="space-y-4">
              {/* Phones */}
              {/* {data.contact.phones.map(
                (phone, idx) =>
                  phone.val && (
                    <ContactItem
                      key={idx}
                      icon={Phone}
                      href={phone.href}
                      label={phone.label}
                    >
                      {phone.val}
                    </ContactItem>
                  )
              )} */}
              {/* Emails */}
              {data.contact.emails.map(
                (email, idx) =>
                  email.val && (
                    <ContactItem
                      key={idx}
                      icon={Mail}
                      href={email.href}
                      label={email.label}
                    >
                      {email.val}
                    </ContactItem>
                  )
              )}
            </ul>
          </div>

          {/* Col 4: Locations & Hours (Spans 3 cols on Desktop) */}
          <div className="lg:col-span-3">
            <FooterHeading>Locations & Hours</FooterHeading>
            <ul className="space-y-5">
              {data.contact.address1 && (
                <ContactItem icon={MapPin}>
                  <span className="block font-medium text-foreground text-xs mb-1">
                    Factory 1
                  </span>
                  {data.contact.address1}
                </ContactItem>
              )}
              {data.contact.address2 && (
                <ContactItem icon={MapPin}>
                  <span className="block font-medium text-foreground text-xs mb-1">
                    Factory 2
                  </span>
                  {data.contact.address2}
                </ContactItem>
              )}

              <li className="flex items-start gap-3 pt-2 border-t border-zinc-200/60 mt-4">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                  <Clock className="h-3 w-3" />
                </div>
                <div className="text-sm">
                  <span className="block font-medium text-foreground">
                    Business Hours
                  </span>
                  <span className="text-muted-foreground">
                    Mon - Sat: 8:00 AM - 6:00 PM
                  </span>
                  <span className="block text-muted-foreground text-xs mt-0.5">
                    Sunday: Closed
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className="mt-16 pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>
            © {year} {data.brand.name}. {data.legal.rights}
          </p>
          <div className="flex gap-6">
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              {data.legal.terms}
            </Link>
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              {data.legal.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
