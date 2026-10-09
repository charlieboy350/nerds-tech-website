import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/site";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | AI Automation, Web Design & Branding Studio`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "digital agency",
    "AI automation agency",
    "web design",
    "web development",
    "branding studio",
    "logo design",
    "SEO services",
    "AI chat support",
    "mobile app development",
    "motion graphics",
    "social media marketing",
    "content writing",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | AI Automation, Web Design & Branding Studio`,
    description: SITE.description,
    images: [{ url: "/og-cover.png", width: 1200, height: 630, alt: `${SITE.name} — AI, Design & Development studio` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | AI Automation, Web Design & Branding Studio`,
    description: SITE.description,
    images: ["/og-cover.png"],
  },
  alternates: { canonical: SITE.url },
  category: "technology",
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  email: SITE.email,
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "5010 Prides Ct",
    addressLocality: "Murrysville",
    addressRegion: "PA",
    postalCode: "15668",
    addressCountry: "US",
  },
  sameAs: Object.values(SITE.socials),
  priceRange: "$$",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  publisher: { "@id": `${SITE.url}/#organization` },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-ink-950 font-sans text-slate-100">
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
