"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, SearchCheck, Map, Puzzle, GraduationCap, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const STEPS = [
  {
    icon: SearchCheck,
    title: "Audit",
    text: "We map your codebase and score each module for AI value versus risk — so effort goes where it pays.",
  },
  {
    icon: Map,
    title: "Roadmap",
    text: "You approve an ordered plan: highest impact, lowest risk first. No surprises, no open-ended billing.",
  },
  {
    icon: Puzzle,
    title: "Integrate",
    text: "We ship AI into one module at a time, wrapped in tests. Each one stable before the next begins.",
  },
  {
    icon: GraduationCap,
    title: "Handover",
    text: "Docs and training for your team, so you own every line we touched and can extend it yourself.",
  },
];

export default function AiIntegration() {
  return (
    <section className="relative py-20 sm:py-28" aria-label="AI codebase integration">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-steel-500/30 bg-gradient-to-b from-ink-800 to-ink-900 px-6 py-12 sm:px-12 sm:py-16">
            <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
            <motion.div
              className="absolute -top-28 right-10 h-72 w-72 rounded-full bg-steel-500/20 blur-[110px]"
              aria-hidden="true"
              animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.1, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-28 left-10 h-72 w-72 rounded-full bg-brand-400/15 blur-[110px]"
              aria-hidden="true"
              animate={{ opacity: [0.9, 0.5, 0.9], scale: [1.1, 1, 1.1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative">
              <SectionHeading
                eyebrow="AI integration, done carefully"
                title={<>Already have a product? We&apos;ll bring AI to it — <span className="text-gradient">one module at a time.</span></>}
                sub="No rip-and-replace. No six-month rewrite. We study your codebase, find where AI actually pays off, and integrate it module by module — each one shipped, tested, and stable before the next begins."
              />

              <motion.ol
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
                className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4"
              >
                {STEPS.map((step, i) => (
                  <motion.li
                    key={step.title}
                    variants={{
                      hidden: { opacity: 0, y: 26 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                    }}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-950/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-400/50 hover:shadow-[0_18px_50px_-18px_rgba(69,179,212,0.5)]"
                  >
                    {/* Top accent line sweeps in on hover */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-brand-400 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                    />
                    {/* Corner glow fades in on hover */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-brand-400/0 blur-3xl transition-colors duration-500 group-hover:bg-brand-400/15"
                    />
                    <div className="relative flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-steel-500/25 to-brand-400/10 text-steel-300 ring-1 ring-steel-500/30 transition-all duration-300 group-hover:scale-110 group-hover:text-brand-300 group-hover:ring-brand-400/50">
                        <step.icon className="size-5" />
                      </span>
                      <span className="font-display text-sm font-bold text-slate-500 transition-colors duration-300 group-hover:text-brand-300">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="relative mt-4 font-display text-lg font-semibold text-white transition-colors duration-300 group-hover:text-brand-200">
                      {step.title}
                    </h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-slate-400">{step.text}</p>
                  </motion.li>
                ))}
              </motion.ol>

              <Reveal className="mt-10 text-center">
                <p className="inline-flex items-center gap-2 rounded-full border border-brand-400/25 bg-brand-400/5 px-5 py-2.5 text-sm text-brand-300">
                  <ShieldCheck className="size-4" />
                  We work in your repo, your stack, your process. Your code stays yours.
                </p>
                <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    href="/contact"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-steel-500 to-brand-400 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-steel-500/25 transition-transform hover:scale-[1.03] active:scale-[0.98] sm:w-auto"
                  >
                    Discuss your codebase
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/services#ai-codebase-integration"
                    className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/50 hover:bg-brand-500/10 hover:shadow-[0_12px_32px_-12px_rgba(69,179,212,0.6)] sm:w-auto"
                  >
                    How it works
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
