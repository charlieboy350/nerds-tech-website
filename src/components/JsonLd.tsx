import type { ReactNode } from "react";
/**
 * Renders a JSON-LD <script> tag for structured data.
 * Used for Organization, WebSite, FAQPage, and Service schemas (SEO + AI SEO).
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
