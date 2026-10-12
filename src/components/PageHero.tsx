"use client";

import { motion } from "framer-motion";
import GsapReveal from "@/components/gsap/GsapReveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  sub?: string;
}

/**
 * Animated hero used at the top of every inner page (SEO: single h1 per page).
 * Mirrors the homepage hero: aurora backdrop, glow pill eyebrow, gradient title.
 */
export default function PageHero({ eyebrow, title, sub }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-36 pb-14 sm:pt-44 sm:pb-20" aria-label="Page introduction">
      {/* Backdrop — same aurora treatment as the homepage hero */}
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" aria-hidden="true" />
      <div className="aurora-bg absolute inset-0" aria-hidden="true" />
      <div className="absolute -top-32 left-1/2 h-[380px] w-[720px] -translate-x-1/2 rounded-full bg-brand-500/25 blur-[140px]" aria-hidden="true" />
      <div className="absolute top-40 -left-32 h-72 w-72 rounded-full bg-steel-500/20 blur-[120px]" aria-hidden="true" />
      <div className="absolute top-48 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-[120px]" aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-7xl px-5 text-center sm:px-8"
      >
        <GsapReveal>
          <span className="inline-flex items-center rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-300 shadow-[0_0_24px_-6px_rgba(139,92,246,0.5)]">
            {eyebrow}
          </span>
        </GsapReveal>
        <h1 className="text-gradient mx-auto mt-6 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {sub && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">{sub}</p>
        )}
      </motion.div>
    </section>
  );
}
