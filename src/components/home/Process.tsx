"use client";

import { motion } from "framer-motion";
import { PROCESS } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";

export default function Process() {
  return (
    <section className="relative py-20 sm:py-28" aria-label="Our process">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How we work"
          title="From first call to compounding growth."
          sub="A simple, transparent process refined over 120+ launches. You'll always know what's happening, what's next, and what it costs."
        />

        <div className="relative mt-14">
          {/* Connector line */}
          <div className="absolute left-[27px] top-8 bottom-8 hidden w-px bg-gradient-to-b from-steel-500/60 via-steel-500/20 to-transparent md:block" aria-hidden="true" />

          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="space-y-6"
          >
            {PROCESS.map((phase) => (
              <motion.li
                key={phase.step}
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="relative flex gap-6 rounded-2xl border border-white/10 bg-ink-800/60 p-6 backdrop-blur-sm transition-colors hover:border-steel-500/40 sm:p-8 md:ml-0"
              >
                <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-steel-500 to-brand-400 font-display text-lg font-bold text-white shadow-lg shadow-steel-500/25">
                  {phase.step}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-white">{phase.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">{phase.text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
