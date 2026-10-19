"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  sub?: string;
}

/** Cinematic hero used at the top of every inner page (SEO: single h1 per page). */
export default function PageHero({ eyebrow, title, sub }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink-950 pt-36 pb-16 sm:pt-44 sm:pb-24" aria-label="Page introduction">
      {/* Cinematic backdrop */}
      <div className="aurora-bg absolute inset-0" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-7xl px-5 text-center sm:px-8"
      >
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
          {title}
        </h1>
        {sub && (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg lg:text-xl">{sub}</p>
        )}
      </motion.div>
    </section>
  );
}
