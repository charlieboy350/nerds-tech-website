import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Check, ChevronRight, Clock } from "lucide-react";
import GsapReveal from "@/components/gsap/GsapReveal";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import HoverFaq from "@/components/HoverFaq";
import { BLOG_POSTS, getPost, formatDate } from "@/data/blog";
import { SITE } from "@/site";
import ContactButton from "@/components/contact/ContactButton";

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
        <ol className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
          <li>
            <Link href="/" className="transition-colors hover:text-brand-400">Home</Link>
          </li>
          <li aria-hidden="true"><ChevronRight className="size-4" /></li>
          <li>
            <Link href="/blog" className="transition-colors hover:text-brand-400">Blog</Link>
          </li>
          <li aria-hidden="true"><ChevronRight className="size-4" /></li>
          <li className="max-w-[220px] truncate text-zinc-300 sm:max-w-none">{post.title}</li>
        </ol>
      </nav>

      <header className="relative overflow-hidden bg-ink-950">
        <div data-beam="1" className="light-beam absolute inset-0" aria-hidden="true" />
        <div className="grain absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-5 pt-10 sm:px-8 sm:pt-14">
        <GsapReveal>
          <span className="inline-flex items-center gap-2 bg-brand-500/10 px-3.5 py-1.5 text-xs font-semibold text-brand-400">
            {post.category}
          </span>
        </GsapReveal>
        <GsapReveal delay={0.08}>
          <h1 className="mt-5 font-display text-3xl font-black uppercase tracking-tight text-cream sm:text-5xl">
            {post.title}
          </h1>
        </GsapReveal>
        <GsapReveal delay={0.16}>
          <p className="mt-5 text-lg leading-relaxed text-zinc-400">{post.excerpt}</p>
        </GsapReveal>
        <GsapReveal delay={0.2}>
          <div className="mt-6 flex flex-col items-center gap-2 text-sm sm:flex-row sm:flex-wrap sm:justify-start sm:gap-x-4 sm:gap-y-2">
            <div className="flex items-center gap-x-4">
              <span className="inline-flex items-center gap-1.5 text-zinc-300">
                <Calendar className="size-4 text-brand-400" />
                {formatDate(post.date)}
              </span>
              <span className="size-1 rounded-full bg-zinc-600" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5 text-zinc-300">
                <Clock className="size-4 text-brand-400" />
                {post.readTime} min read
              </span>
            </div>
            <span className="hidden size-1 rounded-full bg-zinc-600 sm:block" aria-hidden="true" />
            <span className="text-zinc-400">
              By <span className="font-semibold text-white">{SITE.name}</span>
            </span>
          </div>
        </GsapReveal>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
        {post.sections.map((section, i) => (
          <GsapReveal key={section.heading} delay={Math.min(i * 0.03, 0.15)}>
            <section className="mb-12">
              <h2 className="font-display text-2xl font-black uppercase tracking-tight text-cream">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-zinc-300 sm:text-base">
                {section.paragraphs.map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>
              {section.list && section.list.length > 0 && (
                <ul className="mt-5 space-y-3">
                  {section.list.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-[15px] leading-relaxed text-zinc-300">
                      <span className="mt-1 grid size-5 shrink-0 place-items-center bg-brand-500/15 text-brand-400">
                        <Check className="size-3" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </GsapReveal>
        ))}

        <GsapReveal>
          <section className="mb-12 border border-brand-400/20 bg-brand-500/5 p-8 sm:p-10">
            <h2 className="font-display text-2xl font-black uppercase tracking-tight text-cream">
              {post.closingHeading}
            </h2>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-zinc-300 sm:text-base">
              {post.closingParagraphs.map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </div>
            <ContactButton
              className="group mt-6 inline-flex whitespace-nowrap items-center gap-2 bg-brand-400 btn-gradient-rev px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110"
            >
              Talk to us about automation
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </ContactButton>
          </section>
        </GsapReveal>

        {post.faqs.length > 0 && (
          <section aria-label="Frequently asked questions" className="mb-4">
            <h2 className="font-display text-2xl font-black uppercase tracking-tight text-cream">
              Frequently asked questions
            </h2>
            <p className="mt-2 text-sm text-zinc-500">Select a question to reveal the answer.</p>
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
            className="group border border-white/10 bg-ink-800/50 p-6 transition-all duration-300 hover:border-brand-400/40 hover:bg-ink-800"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              <ArrowLeft className="size-3.5" /> Previous
            </span>
            <span className="mt-2 block font-display text-base font-semibold text-white transition-colors group-hover:text-brand-300">
              {prev.title}
            </span>
          </Link>
          <Link
            href={`/blog/${next.slug}`}
            className="group border border-white/10 bg-ink-800/50 p-6 text-right transition-all duration-300 hover:border-brand-400/40 hover:bg-ink-800"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Next <ArrowRight className="size-3.5" />
            </span>
            <span className="mt-2 block font-display text-base font-semibold text-white transition-colors group-hover:text-brand-300">
              {next.title}
            </span>
          </Link>
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex whitespace-nowrap items-center gap-2 border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-brand-400/50 hover:bg-brand-500/10"
          >
            <ArrowLeft className="size-4" /> All articles
          </Link>
        </div>
      </nav>

      <CtaBanner />
    </>
  );
}
