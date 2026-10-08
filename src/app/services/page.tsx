import type { Metadata } from "next";
import { Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { SERVICES } from "@/data/content";
import { SITE } from "@/site";

export const metadata: Metadata = {
  title: "Services — AI Automation, Web Design, Branding & More",
  description:
    "Explore all 11 NerdsTech services: AI automation, AI chat support, AI codebase integration, web design & development, logo & branding, SEO, content, social media, motion graphics, and mobile apps.",
  openGraph: {
    title: "Services — AI Automation, Web Design, Branding & More",
    description:
      "All 11 NerdsTech services in one place: AI automation, AI chat support, AI codebase integration, web design & development, branding, SEO, content, social media, motion graphics, and mobile apps.",
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
      url: `${SITE.url}/services#${s.slug}`,
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesSchema} />
      <PageHero
        eyebrow="Services"
        title="Everything your brand needs. Nothing it doesn't."
        sub="Eleven disciplines that work solo or snap together into one connected build. Scroll through, then tell us which ones fit your goals."
      />

      <div className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
        <ol className="space-y-6">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={Math.min(i * 0.03, 0.2)}>
              <li
                id={service.slug}
                className="card-glow scroll-mt-24 rounded-3xl border border-white/10 bg-ink-800/60 p-8 backdrop-blur-sm sm:p-10"
              >
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-steel-500/20 to-brand-400/10 text-steel-300 ring-1 ring-steel-500/30">
                        <service.icon className="size-7" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                          Service {String(i + 1).padStart(2, "0")}
                        </p>
                        <h2 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                          {service.title}
                        </h2>
                      </div>
                    </div>
                    <p className="mt-5 max-w-2xl leading-relaxed text-slate-400">{service.long}</p>
                  </div>
                  <div className="lg:w-72 lg:shrink-0">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                      What’s included
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {service.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-sm text-slate-300">
                          <Check className="mt-0.5 size-4 shrink-0 text-brand-300" strokeWidth={3} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>

      <CtaBanner />
    </>
  );
}
