/**
 * Central site configuration.
 * Change these values once and they propagate across metadata, JSON-LD,
 * sitemap, footer, and contact sections.
 */
export const SITE = {
  name: "NerdsTech",
  tagline: "AI · Design · Development — under one roof",
  url: "https://nerdstech.co",
  description:
    "NerdsTech is a full-stack digital studio crafting AI automation, high-converting websites, bold branding, and mobile apps — one team, zero hand-offs.",
  email: "support@nerdstech.co",
  phone: "+1 559-315-3648",
  address: "5010 Prides Ct, Murrysville, PA 15668",
  socials: {
    x: "https://x.com/nerdstech",
    instagram: "https://instagram.com/nerdstech",
    linkedin: "https://linkedin.com/company/nerdstech",
    dribbble: "https://dribbble.com/nerdstech",
  },
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
