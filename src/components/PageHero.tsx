"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  sub?: string;
}

/** Animated hero used at the top of every inner page (SEO: single h1 per page). */
export default function PageHero({ eyebrow, title, sub }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-36 pb-14 sm:pt-44 sm:pb-20" aria-label="Page introduction">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" aria-hidden="true" />
      <div className="absolute -top-32 left-1/2 h-[380px] w-[720px] -translate-x-1/2 rounded-full bg-steel-500/15 blur-[130px]" aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-7xl px-5 text-center sm:px-8"
      >
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-steel-400">{eyebrow}</p>
        </Reveal>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {sub && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">{sub}</p>
        )}
      </motion.div>
    </section>
  );
}
