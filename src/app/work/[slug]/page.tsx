import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  Quote,
  Target,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { PROJECTS, serviceSlugFor } from "@/data/content";
import { SITE } from "@/site";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  const title = `${project.client} — ${project.title} | Case Study`;
  const description = `${project.client} case study: ${project.description} Result: ${project.result}.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: `${SITE.url}${project.image}`, alt: `${project.client} — ${project.title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE.url}${project.image}`],
    },
    alternates: { canonical: `${SITE.url}/work/${project.slug}` },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = PROJECTS[index];
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${project.client} — ${project.title}`,
    description: project.description,
    image: `${SITE.url}${project.image}`,
    author: { "@type": "Organization", name: "NerdsTech", url: SITE.url },
    publisher: { "@type": "Organization", name: "NerdsTech", url: SITE.url },
    mainEntityOfPage: `${SITE.url}/work/${project.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Work", item: `${SITE.url}/work` },
      {
        "@type": "ListItem",
        position: 3,
        name: `${project.client} — ${project.title}`,
        item: `${SITE.url}/work/${project.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[articleJsonLd, breadcrumbJsonLd]} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-28 sm:px-8 sm:pt-36">
        <ol className="flex items-center gap-2 text-sm text-slate-500">
          <li>
            <Link href="/" className="transition-colors hover:text-brand-300">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="size-4" />
          </li>
          <li>
            <Link href="/work" className="transition-colors hover:text-brand-300">
              Work
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="size-4" />
          </li>
          <li className="text-slate-300">{project.client}</li>
        </ol>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]" aria-hidden="true" />
        <div className="absolute -top-32 left-1/2 h-[380px] w-[720px] -translate-x-1/2 rounded-full bg-brand-500/15 blur-[130px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-brand-500/40 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-300">
                {project.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-slate-400">
                <Clock className="size-4" /> {project.timeline}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {project.client}: <span className="text-gradient">{project.title}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-400 sm:text-lg">
              {project.description}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.services.map((service) => {
                const slug = serviceSlugFor(service);
                const cls =
                  "rounded-full bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/50 hover:bg-brand-500/10 hover:text-brand-200 hover:ring-brand-400/40 hover:shadow-[0_8px_20px_-8px_rgba(69,179,212,0.5)]";
                return slug ? (
                  <Link
                    key={service}
                    href={`/services/${slug}`}
                    title={`Learn more about ${service}`}
                    className={cls}
                  >
                    {service}
                  </Link>
                ) : (
                  <span key={service} className={`${cls} cursor-default`}>
                    {service}
                  </span>
                );
              })}
            </div>
          </Reveal>
        </div>
      </header>

      {/* Hero image — full-bleed banner */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="relative h-64 overflow-hidden rounded-3xl border border-white/10 sm:h-96 lg:h-[28rem]">
            <Image
              src={project.image}
              alt={`${project.client} — ${project.title}`}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
              style={{ objectPosition: project.imagePosition ?? "center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" aria-hidden="true" />
          </div>
        </Reveal>
      </div>

      {/* Metrics */}
      <section aria-label="Key results" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {project.metrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 0.07}>
              <div className="card-glow h-full rounded-2xl border border-white/10 bg-ink-800/60 p-6 text-center">
                <p className="font-display text-3xl font-bold text-brand-300 sm:text-4xl">{metric.value}</p>
                <p className="mt-2 text-sm leading-snug text-slate-400">{metric.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Overview */}
      <section aria-label="Project overview" className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 sm:pb-20">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-steel-400 lg:sticky lg:top-28">
              Overview
            </p>
          </div>
          <Reveal>
            <div className="max-w-3xl space-y-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              {project.overview.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Challenge */}
      <section aria-label="The challenge" className="border-y border-white/5 bg-ink-900/50 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-14">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-steel-400 lg:sticky lg:top-28">
                <Target className="size-4" /> The challenge
              </p>
            </div>
            <ul className="max-w-3xl space-y-4">
              {project.challenge.map((item, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <li className="group relative flex gap-4 overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:bg-ink-800 hover:shadow-[0_14px_40px_-16px_rgba(69,179,212,0.45)]">
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-gradient-to-b from-brand-400 to-steel-500 transition-transform duration-300 group-hover:scale-y-100"
                    />
                    <span className="pl-2 font-display text-lg font-bold text-brand-400 transition-all duration-300 group-hover:scale-110 group-hover:text-brand-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-relaxed text-slate-300 transition-colors duration-300 group-hover:text-white sm:text-base">
                      {item}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section aria-label="How we did it" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <SectionHeading
          eyebrow="Approach"
          title="How we got there."
          sub="No magic — just a disciplined process, applied with care at every step."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {project.approach.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.07}>
              <div className="card-glow h-full rounded-2xl border border-white/10 bg-ink-800/60 p-7">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 ring-1 ring-brand-500/30">
                    <Wrench className="size-5" />
                  </span>
                  <p className="font-display text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Step {i + 1}
                  </p>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Result highlight + testimonial */}
      <section aria-label="Outcome" className="border-y border-white/5 bg-ink-900/50 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-300">
              <TrendingUp className="size-4" /> The outcome
            </p>
            <p className="mt-6 font-display text-3xl font-bold text-white sm:text-4xl">{project.result}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <figure className="mx-auto mt-10 max-w-3xl rounded-3xl border border-white/10 bg-ink-800/60 p-8 sm:p-10">
              <Quote className="mx-auto size-8 text-brand-400" aria-hidden="true" />
              <blockquote className="mt-4 text-base leading-relaxed text-slate-200 sm:text-lg">
                “{project.testimonial.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm text-slate-400">
                <span className="font-semibold text-white">{project.testimonial.name}</span> — {project.testimonial.role}
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.16}>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
              {project.metrics.slice(1).map((m) => (
                <li key={m.label} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-brand-400" />
                  <span>
                    <strong className="text-white">{m.value}</strong> {m.label.charAt(0).toLowerCase() + m.label.slice(1)}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Prev / Next */}
      <nav aria-label="More case studies" className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href={`/work/${prev.slug}`}
            className="card-glow group flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-800/60 p-5"
          >
            <ArrowLeft className="size-5 shrink-0 text-slate-500 transition-colors group-hover:text-brand-300" />
            <span>
              <span className="block text-xs uppercase tracking-wider text-slate-500">Previous case study</span>
              <span className="mt-1 block font-display font-semibold text-white">{prev.client} — {prev.title}</span>
            </span>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="card-glow group flex items-center justify-end gap-4 rounded-2xl border border-white/10 bg-ink-800/60 p-5 text-right"
          >
            <span>
              <span className="block text-xs uppercase tracking-wider text-slate-500">Next case study</span>
              <span className="mt-1 block font-display font-semibold text-white">{next.client} — {next.title}</span>
            </span>
            <ArrowRight className="size-5 shrink-0 text-slate-500 transition-colors group-hover:text-brand-300" />
          </Link>
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/50 hover:bg-brand-500/10 hover:shadow-[0_12px_32px_-12px_rgba(69,179,212,0.6)]"
          >
            View all case studies <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </nav>

      <CtaBanner />
    </>
  );
}
