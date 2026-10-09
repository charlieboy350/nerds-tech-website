import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { SERVICES, PROJECTS } from "@/data/content";
import { getServiceDetail } from "@/data/service-details";
import { SITE } from "@/site";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  const url = `${SITE.url}/services/${service.slug}`;
  const title = `${service.title} — Problems We Solve & How`;
  return {
    title,
    description: service.long,
    keywords: [service.title.toLowerCase(), "nerdstech", "digital studio", "hire agency"],
    openGraph: { type: "article", title, description: service.long, url },
    twitter: { card: "summary_large_image", title, description: service.long },
    alternates: { canonical: url },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();
  const detail = getServiceDetail(slug);
  const Icon = service.icon;
  const url = `${SITE.url}/services/${service.slug}`;
  const related = service.relatedProject
    ? PROJECTS.find((p) => p.slug === service.relatedProject)
    : undefined;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.long,
    provider: { "@id": `${SITE.url}/#organization` },
    url,
    areaServed: "Worldwide",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: url },
    ],
  };

  const faqSchema = detail
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: detail.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])]} />

      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-28 sm:px-8 sm:pt-36">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <li><Link href="/" className="transition-colors hover:text-brand-300">Home</Link></li>
          <li aria-hidden="true"><ChevronRight className="size-4" /></li>
          <li><Link href="/services" className="transition-colors hover:text-brand-300">Services</Link></li>
          <li aria-hidden="true"><ChevronRight className="size-4" /></li>
          <li className="text-slate-300">{service.title}</li>
        </ol>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden pt-10 pb-14 sm:pt-14 sm:pb-20">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]" aria-hidden="true" />
        <div className="absolute -top-32 left-1/2 h-[380px] w-[720px] -translate-x-1/2 rounded-full bg-brand-500/15 blur-[130px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <span className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-steel-500/20 to-brand-400/10 text-steel-300 ring-1 ring-steel-500/30">
              <Icon className="size-8" />
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {service.title}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-400 sm:text-lg">
              {service.long}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-steel-500 to-brand-400 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-steel-500/30 transition-transform hover:scale-[1.03] active:scale-[0.98] sm:w-auto"
              >
                Start your project
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/50 hover:bg-brand-500/10 hover:shadow-[0_12px_32px_-12px_rgba(69,179,212,0.6)] sm:w-auto"
              >
                All services
              </Link>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Problems & solutions */}
      {detail && detail.problems.length > 0 && (
        <section aria-label="Problems this service solves" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-steel-400">
              Real-world problems
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Sound familiar? Here&apos;s how we fix it.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {detail.problems.map((problem, i) => (
              <Reveal key={problem.title} delay={Math.min(i * 0.06, 0.24)}>
                <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-ink-800/60 p-8 backdrop-blur-sm transition-all duration-300 hover:border-brand-400/30">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-400/90">
                    The problem
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold text-white">
                    {problem.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-400">
                    {problem.description}
                  </p>
                  <div className="my-6 h-px bg-gradient-to-r from-brand-400/40 to-transparent" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">
                    Our solution
                  </span>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-300">
                    {problem.solution}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Deliverables */}
      <section aria-label="What you get" className="border-t border-white/5 bg-ink-900/40">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-steel-400">
              Deliverables
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What&apos;s included
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {service.deliverables.map((d, i) => (
              <Reveal key={d} delay={Math.min(i * 0.05, 0.2)}>
                <li className="flex items-start gap-3 rounded-2xl border border-white/10 bg-ink-800/50 p-5">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-300">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-[15px] text-slate-200">{d}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Related case study */}
      {related && (
        <section aria-label="Related work" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-steel-400">
              Proof, not promises
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              See it in action
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href={`/work/${related.slug}`}
              className="group mt-10 grid overflow-hidden rounded-3xl border border-white/10 bg-ink-800/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:shadow-[0_20px_50px_-20px_rgba(69,179,212,0.4)] lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={related.image}
                  alt={`${related.client} — ${related.title}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
                  {related.category}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold text-white transition-colors group-hover:text-brand-200 sm:text-3xl">
                  {related.client}: {related.title}
                </h3>
                <p className="mt-4 leading-relaxed text-slate-400">{related.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-300">
                  Read the case study
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      {/* FAQ */}
      {detail && detail.faqs.length > 0 && (
        <section aria-label="Frequently asked questions" className="border-t border-white/5 bg-ink-900/40">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Questions, answered
              </h2>
            </Reveal>
            <div className="mt-10 space-y-4">
              {detail.faqs.map((faq) => (
                <div key={faq.q} className="rounded-2xl border border-white/10 bg-ink-800/50 p-6">
                  <h3 className="font-display text-base font-semibold text-white">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
