"use client";

import Script from "next/script";

/**
 * Google tag (gtag.js) — powers GA4 analytics and Google Ads conversion
 * tracking for the marketing side of nerdstech.co.
 *
 * Setup (one-time, needs the user's Google account):
 *   1. Create a GA4 property at analytics.google.com → get the Measurement ID (G-XXXXXXXXXX)
 *   2. Set NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX in Vercel → Environment Variables
 *   3. Redeploy. Until the ID is set, this component renders nothing and all
 *      trackEvent() calls are safe no-ops.
 *
 * Conversions: the contact form fires a `generate_lead` event on every
 * successful submission (see ContactSection). In Google Ads, import that
 * event as a conversion so Smart Bidding learns which clicks become inquiries.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** Fire a GA4 event. Safe to call even when the tag isn't loaded. */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params ?? {});
  }
}

export default function GoogleAnalytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
