import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Check, ChevronRight, Clock } from "lucide-react";
import Reveal from "@/components/Reveal";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import HoverFaq from "@/components/HoverFaq";
import { BLOG_POSTS, getPost, formatDate } from "@/data/blog";
import { SITE } from "@/site";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `${SITE.url}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.date,
      authors: [SITE.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: { canonical: url },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const idx = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const prev = BLOG_POSTS[(idx - 1 + BLOG_POSTS.length) % BLOG_POSTS.length];
  const next = BLOG_POSTS[(idx + 1) % BLOG_POSTS.length];
  const url = `${SITE.url}/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: url,
    keywords: post.keywords.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema, faqSchema]} />

      <nav aria-label="Breadcrumb" className="mx-auto max-w-4xl px-5 pt-28 sm:px-8 sm:pt-36">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <li>
            <Link href="/" className="transition-colors hover:text-brand-300">Home</Link>
          </li>
          <li aria-hidden="true"><ChevronRight className="size-4" /></li>
          <li>
            <Link href="/blog" className="transition-colors hover:text-brand-300">Blog</Link>
          </li>
          <li aria-hidden="true"><ChevronRight className="size-4" /></li>
          <li className="max-w-[220px] truncate text-slate-300 sm:max-w-none">{post.title}</li>
        </ol>
      </nav>

      <header className="mx-auto max-w-4xl px-5 pt-10 sm:px-8 sm:pt-14">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-3.5 py-1.5 text-xs font-semibold text-brand-300 ring-1 ring-brand-400/30">
            {post.category}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {post.title}
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 text-lg leading-relaxed text-slate-400">{post.excerpt}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-6 flex flex-col items-center gap-2 text-sm sm:flex-row sm:flex-wrap sm:justify-start sm:gap-x-4 sm:gap-y-2">
            <div className="flex items-center gap-x-4">
              <span className="inline-flex items-center gap-1.5 text-slate-300">
                <Calendar className="size-4 text-brand-400" />
                {formatDate(post.date)}
              </span>
              <span className="size-1 rounded-full bg-slate-600" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5 text-slate-300">
                <Clock className="size-4 text-brand-400" />
                {post.readTime} min read
              </span>
            </div>
            <span className="hidden size-1 rounded-full bg-slate-600 sm:block" aria-hidden="true" />
            <span className="text-slate-400">
              By <span className="font-semibold text-white">{SITE.name}</span>
            </span>
          </div>
        </Reveal>
      </header>

      <article className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
        {post.sections.map((section, i) => (
          <Reveal key={section.heading} delay={Math.min(i * 0.03, 0.15)}>
            <section className="mb-12">
              <h2 className="font-display text-2xl font-bold tracking-tight text-white">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-slate-300 sm:text-base">
                {section.paragraphs.map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>
              {section.list && section.list.length > 0 && (
                <ul className="mt-5 space-y-3">
                  {section.list.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-[15px] leading-relaxed text-slate-300">
                      <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-300">
                        <Check className="size-3" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </Reveal>
        ))}

        <Reveal>
          <section className="mb-12 rounded-3xl border border-brand-400/20 bg-brand-500/5 p-8 sm:p-10">
            <h2 className="font-display text-2xl font-bold tracking-tight text-white">
              {post.closingHeading}
            </h2>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-slate-300 sm:text-base">
              {post.closingParagraphs.map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </div>
            <Link
              href="/contact"
              className="group mt-6 inline-flex whitespace-nowrap items-center gap-2 rounded-full bg-brand-400 btn-gradient-rev px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(69,179,212,0.5)] transition-all duration-300 hover:brightness-110"
            >
              Talk to us about automation
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </section>
        </Reveal>

        {post.faqs.length > 0 && (
          <section aria-label="Frequently asked questions" className="mb-4">
            <h2 className="font-display text-2xl font-bold tracking-tight text-white">
              Frequently asked questions
            </h2>
            <p className="mt-2 text-sm text-slate-500">Hover a card to reveal the answer.</p>
            <div className="mt-6">
              <HoverFaq faqs={post.faqs} />
            </div>
          </section>
        )}
      </article>

      <nav aria-label="More articles" className="mx-auto max-w-4xl px-5 pb-20 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href={`/blog/${prev.slug}`}
            className="group rounded-2xl border border-white/10 bg-ink-800/50 p-6 transition-all duration-300 hover:border-brand-400/40 hover:bg-ink-800"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <ArrowLeft className="size-3.5" /> Previous
            </span>
            <span className="mt-2 block font-display text-base font-semibold text-white transition-colors group-hover:text-brand-200">
              {prev.title}
            </span>
          </Link>
          <Link
            href={`/blog/${next.slug}`}
            className="group rounded-2xl border border-white/10 bg-ink-800/50 p-6 text-right transition-all duration-300 hover:border-brand-400/40 hover:bg-ink-800"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Next <ArrowRight className="size-3.5" />
            </span>
            <span className="mt-2 block font-display text-base font-semibold text-white transition-colors group-hover:text-brand-200">
              {next.title}
            </span>
          </Link>
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex whitespace-nowrap items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/50 hover:bg-brand-500/10 hover:shadow-[0_12px_32px_-12px_rgba(69,179,212,0.6)]"
          >
            <ArrowLeft className="size-4" /> All articles
          </Link>
        </div>
      </nav>

      <CtaBanner />
    </>
  );
}
