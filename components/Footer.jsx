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
} from "lucide-react";

const SOCIAL_LINKS = {
  INSTAGRAM: "https://instagram.com/bagworks",
  FACEBOOK: "https://facebook.com/bagworks",
  LINKEDIN: "https://linkedin.com/company/bagworks",
};

const FooterLink = memo(
  ({ href, label, external = false, prefetch = true }) => {
    const linkProps = external
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
        }
      : {};

    return (
      <li className="group">
        <Link
          href={href}
          prefetch={prefetch}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group-hover:translate-x-1 inline-block"
          aria-label={label}
          {...linkProps}
        >
          <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-200 group-hover:after:w-full">
            {label}
          </span>
        </Link>
      </li>
    );
  }
);

FooterLink.displayName = "FooterLink";

const FooterCol = memo(({ title, children }) => (
  <div className="space-y-4">
    <h3 className="text-sm font-semibold tracking-tight text-foreground">
      {title}
    </h3>
    <ul className="space-y-3" role="list">
      {children}
    </ul>
  </div>
));

FooterCol.displayName = "FooterCol";

const SocialButton = memo(({ href, label, icon: Icon }) => (
  <Button
    variant="outline"
    size="icon"
    className="h-10 w-10 rounded-lg hover:scale-105 transition-transform duration-200 hover:border-primary hover:text-primary"
    asChild
    aria-label={label}
  >
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center"
    >
      <Icon className="h-4 w-4" />
    </a>
  </Button>
));

SocialButton.displayName = "SocialButton";

// Loading skeleton for footer
export function FooterSkeleton() {
  return (
    <footer className="border-t bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand skeleton */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-5">
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-4 w-48 mb-2" />
            <Skeleton className="h-4 w-40" />
            <div className="flex gap-2 mt-4">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </div>

          {/* Links skeleton */}
          <div className="col-span-1 lg:col-span-3">
            <Skeleton className="h-6 w-24 mb-4" />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-20" />
              ))}
            </div>
          </div>

          {/* Contact skeleton */}
          <div className="col-span-1 lg:col-span-4">
            <Skeleton className="h-6 w-20 mb-4" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Footer() {
  const { dict, isLoading: languageLoading } = useLanguage();

  const f = dict?.footer || {};
  const year = useMemo(() => new Date().getFullYear(), []);

  const footerData = useMemo(
    () => ({
      brand: {
        logoText: f?.brand?.logoText || "B",
        name: f?.brand?.name || "BagWorks",
        tagline:
          f?.brand?.tagline || "Manufacturing • OEM/ODM • Custom Branding",
        desc:
          f?.brand?.desc ||
          "We manufacture bags with consistent quality for long-term partnerships.",
      },
      social: {
        instagram: f?.social?.instagram || SOCIAL_LINKS.INSTAGRAM,
        facebook: f?.social?.facebook || SOCIAL_LINKS.FACEBOOK,
        linkedin: f?.social?.linkedin || SOCIAL_LINKS.LINKEDIN,
      },
      contact: {
        title: f?.contact?.title || "Contact",
        address:
          f?.contact?.address ||
          "123 Factory Street, Industrial Area, Dhaka, Bangladesh",
        phone: f?.contact?.phone || "+880 10 0000 0000",
        phoneRaw: f?.contact?.phoneRaw || "+8801000000000",
        email: f?.contact?.email || "sales@bagworks.com",
      },
      bottom: {
        rights: f?.bottom?.rights || "All rights reserved.",
        terms: f?.bottom?.terms || "Terms",
        privacy: f?.bottom?.privacy || "Privacy",
        cookies: f?.bottom?.cookies || "Cookies",
      },
    }),
    [f]
  );

  const companyLinks = useMemo(
    () => [
      { href: "/about", label: f?.cols?.company?.about || "About" },
      { href: "/products", label: f?.cols?.company?.products || "Products" },
      { href: "/business", label: f?.cols?.company?.factory || "Factory" },
      { href: "/contact", label: f?.cols?.company?.contact || "Contact" },
    ],
    [f]
  );

  if (languageLoading) {
    return <FooterSkeleton />;
  }

  return (
    <footer
      className="border-t bg-background relative"
      role="contentinfo"
      aria-label="Website footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Grid Layout Breakdown:
          - Mobile (default): 1 column
          - Tablet (sm): 2 columns
          - Desktop (lg): 12 columns
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Brand section: Full width on tablet, 5 cols on desktop */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <Link
                href="/"
                className="inline-flex items-center gap-3 group"
                aria-label="Go to homepage"
              >
                {/* <div className="h-12 w-12 rounded-xl border-2 flex items-center justify-center font-bold text-lg bg-primary/5 group-hover:bg-primary/10 transition-colors duration-200 text-foreground">
                  {footerData.brand.logoText}
                </div> */}
                <div className="leading-tight">
                  <p className="font-bold text-lg tracking-tight group-hover:text-primary transition-colors text-foreground">
                    {footerData.brand.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {footerData.brand.tagline}
                  </p>
                </div>
              </Link>

              <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                {footerData.brand.desc}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <SocialButton
                href={footerData.social.instagram}
                label="Instagram"
                icon={Instagram}
              />
              <SocialButton
                href={footerData.social.facebook}
                label="Facebook"
                icon={Facebook}
              />
              <SocialButton
                href={footerData.social.linkedin}
                label="LinkedIn"
                icon={Linkedin}
              />
            </div>
            <div className="space-y-2 hidden sm:block">
               {/* Copyright visible on larger screens here, moved to bottom for mobile if needed */}
              <p className="text-sm text-muted-foreground">
                © {year} {footerData.brand.name}. {footerData.bottom.rights}
              </p>
            </div>
          </div>

          {/* Company links: 1 col on tablet, 3 cols on desktop */}
          <div className="col-span-1 lg:col-span-3">
            <FooterCol title={f?.cols?.company?.title || "Company"}>
              {companyLinks.map((link) => (
                <FooterLink key={link.href} {...link} />
              ))}
            </FooterCol>
          </div>

          {/* Contact info: 1 col on tablet, 4 cols on desktop */}
          <div className="col-span-1 lg:col-span-4 space-y-6">
            <div>
              <h3 className="text-sm font-semibold tracking-tight text-foreground mb-4">
                {footerData.contact.title}
              </h3>

              <address className="space-y-4 text-sm text-muted-foreground not-italic">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                  <span className="leading-relaxed">
                    {footerData.contact.address}
                  </span>
                </div>

                {/* Phone - Stacked for better mobile view */}
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                  <div className="flex flex-col gap-1">
                    <a
                      href={`tel:${footerData.contact.phoneRaw}`}
                      className="hover:text-foreground transition-colors duration-200 hover:underline block"
                      aria-label="Call main line"
                    >
                      {footerData.contact.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
                  <a
                    href={`mailto:${footerData.contact.email}`}
                    className="hover:text-foreground transition-colors duration-200 hover:underline break-all"
                    aria-label="Email us"
                  >
                    {footerData.contact.email}
                  </a>
                </div>
              </address>
            </div>

            {/* Business hours */}
            <div className="pt-2 border-t sm:border-t-0 mt-4 sm:mt-0">
              <p className="text-sm font-semibold mb-2 text-foreground">Business Hours</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Mobile Copyright (Visible only on small screens at the bottom) */}
           <div className="col-span-1 sm:hidden pt-4 border-t">
              <p className="text-sm text-muted-foreground text-center">
                © {year} {footerData.brand.name}.<br />
                {footerData.bottom.rights}
              </p>
          </div>

        </div>
      </div>
    </footer>
  );
}