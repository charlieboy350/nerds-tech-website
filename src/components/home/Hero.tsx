"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles, PlayCircle } from "lucide-react";
import { SITE } from "@/site";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28" aria-label="Introduction">
      {/* Backdrop */}
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" aria-hidden="true" />
      <div className="absolute -top-32 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-steel-500/20 blur-[140px] animate-pulse-glow" aria-hidden="true" />
      <div className="absolute top-40 -left-32 h-96 w-96 rounded-full bg-brand-500/10 blur-[120px] animate-float" aria-hidden="true" />
      <div className="absolute top-64 -right-24 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-[120px] animate-float-slow" aria-hidden="true" />

      <motion.div
        variants={reduce ? undefined : container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-7xl px-5 sm:px-8"
      >
        <motion.div variants={item} className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-steel-500/30 bg-steel-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-steel-300">
            <Sparkles className="size-3.5" />
            {SITE.tagline}
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mx-auto mt-7 max-w-4xl text-center font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Your business on autopilot.
          <br />
          <span className="text-gradient">Your brand impossible to ignore.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          {SITE.name} blends AI automation, standout design, and clean engineering into one
          connected studio. One team takes you from first sketch to launched product —
          and keeps it growing long after.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-steel-500 to-brand-400 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-steel-500/30 transition-transform hover:scale-[1.03] active:scale-[0.98] sm:w-auto"
          >
            Start your project
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/work"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/50 hover:bg-brand-500/10 hover:shadow-[0_12px_32px_-12px_rgba(69,179,212,0.6)] sm:w-auto"
          >
            <PlayCircle className="size-5 text-steel-300" />
            See our work
          </Link>
        </motion.div>

        <motion.dl
          variants={item}
          className="mx-auto mt-14 flex max-w-lg items-center justify-center gap-8 text-center sm:gap-12"
        >
          {[
            ["11", "services"],
            ["1", "team"],
            ["0", "hand-offs"],
          ].map(([value, label]) => (
            <div key={label} className="flex flex-col items-center">
              <dt className="sr-only">{label}</dt>
              <dd className="font-display text-3xl font-bold text-white sm:text-4xl">{value}</dd>
              <dd className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{label}</dd>
            </div>
          ))}
        </motion.dl>

        <motion.div variants={item} className="mt-10 flex justify-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-1 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            Explore all services
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
