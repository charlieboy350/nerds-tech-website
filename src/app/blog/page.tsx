import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { BLOG_POSTS, formatDate } from "@/data/blog";
import { SITE } from "@/site";

export const metadata: Metadata = {
  title: "Blog — SaaS Automation Guides & Playbooks",
  description:
    "Practical guides on converting SaaS systems into automated machines: finance automation, onboarding, AI support, churn prevention, and the full automation roadmap.",
  keywords: [
    "SaaS automation",
    "automate SaaS",
    "SaaS finance automation",
    "automated billing",
    "AI customer support",
    "churn prevention",
  ],
  openGraph: {
    title: "Blog — SaaS Automation Guides & Playbooks",
    description:
      "Practical guides on converting SaaS systems into automated machines: finance, onboarding, AI support, and retention.",
  },
  alternates: { canonical: `${SITE.url}/blog` },
};

const listSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: BLOG_POSTS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      url: `${SITE.url}/blog/${p.slug}`,
      datePublished: p.date,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
  ],
};

export default function BlogPage() {
  const sorted = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const [featured, ...rest] = sorted;

  return (
    <>
      <JsonLd data={[listSchema, breadcrumbSchema]} />
      <PageHero
        eyebrow="Blog"
        title="SaaS automation, explained properly."
        sub="Playbooks for turning manual SaaS operations into self-running systems — finance, onboarding, support, and retention."
      />

      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        {featured && (
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group mb-10 block overflow-hidden rounded-3xl border border-white/10 bg-ink-800/60 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:shadow-[0_20px_50px_-20px_rgba(69,179,212,0.4)] sm:p-12"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-3.5 py-1.5 text-xs font-semibold text-brand-300 ring-1 ring-brand-400/30">
                {featured.category}
              </span>
              <h2 className="mt-5 max-w-3xl font-display text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-brand-200 sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-slate-400">{featured.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-300">
                Read the guide
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span className="mt-4 flex items-center gap-3 text-xs text-slate-500">
                {formatDate(featured.date)} · <Clock className="size-3.5" /> {featured.readTime} min read
              </span>
            </Link>
          </Reveal>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={Math.min(i * 0.06, 0.24)}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-white/10 bg-ink-800/60 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:shadow-[0_20px_50px_-20px_rgba(69,179,212,0.4)]"
              >
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300 ring-1 ring-white/10">
                  {post.category}
                </span>
                <h2 className="mt-4 font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-brand-200">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{post.excerpt}</p>
                <span className="mt-5 flex items-center justify-between text-xs text-slate-500">
                  <span>
                    {formatDate(post.date)} · {post.readTime} min read
                  </span>
                  <ArrowUpRight className="size-4 text-slate-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-300" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      <CtaBanner />
    </>
  );
}
