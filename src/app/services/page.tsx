import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import GsapReveal from "@/components/gsap/GsapReveal";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { SERVICES } from "@/data/content";
import { SITE } from "@/site";

export const metadata: Metadata = {
  title: "Services | AI Automation, Web Design, Branding & More",
  description:
    "Explore all 12 NerdsTech services: AI automation, AI chat support, AI codebase integration, web design & development, logo & branding, SEO, AEO integration, content, social media, motion graphics, and mobile apps.",
  openGraph: {
    title: "Services | AI Automation, Web Design, Branding & More",
    description:
      "All 12 NerdsTech services in one place: AI automation, AI chat support, AI codebase integration, web design & development, branding, SEO, AEO integration, content, social media, motion graphics, and mobile apps.",
  },
  alternates: { canonical: `${SITE.url}/services` },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.long,
      provider: { "@id": `${SITE.url}/#organization` },
      url: `${SITE.url}/services/${s.slug}`,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[servicesSchema, breadcrumbSchema]} />
      <PageHero
        eyebrow="Services"
        title="Everything your brand needs. Nothing it doesn't."
        sub="Twelve disciplines that work solo or snap together into one connected build. Scroll through, then tell us which ones fit your goals."
      />

      <div className="mx-auto max-w-[1440px] px-5 pb-8 sm:px-8">
        <ol className="space-y-6">
          {SERVICES.map((service, i) => (
            <GsapReveal key={service.slug} delay={Math.min(i * 0.03, 0.2)}>
              <li
                id={service.slug}
                className="scroll-mt-24 border-2 border-white/15 bg-ink-800 p-8 sm:p-10"
              >
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <span className="grid size-14 shrink-0 place-items-center bg-cobalt text-white">
                        <service.icon className="size-7" />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                          Service {String(i + 1).padStart(2, "0")}
                        </p>
                        <h2 className="mt-1 font-display text-2xl font-black uppercase tracking-tight text-cream sm:text-3xl">
                          {service.title}
                        </h2>
                      </div>
                    </div>
                    <p className="mt-5 max-w-2xl leading-relaxed text-zinc-400">{service.long}</p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group mt-5 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-brand-400 hover:text-brand-300"
                    >
                      Problems it solves & how
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                  <div className="lg:w-72 lg:shrink-0">
                    <h3 className="text-sm font-black uppercase tracking-wider text-cream">
                      What’s included
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {service.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-sm text-zinc-300">
                          <Check className="mt-0.5 size-4 shrink-0 text-brand-400" strokeWidth={3} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            </GsapReveal>
          ))}
        </ol>
      </div>

      <CtaBanner />
    </>
  );
}
