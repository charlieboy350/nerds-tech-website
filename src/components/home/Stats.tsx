"use client";

import { STATS } from "@/data/content";
import GsapReveal from "@/components/gsap/GsapReveal";
import StatCounter from "@/components/gsap/StatCounter";
import Parallax from "@/components/gsap/Parallax";

export default function Stats() {
  return (
    <section className="relative py-16 sm:py-20" aria-label="Studio statistics">
      <Parallax speed={-6} className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-72 w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/15 blur-[130px]" aria-hidden="true" />
      </Parallax>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <GsapReveal variant="scale">
          <dl className="grain relative grid grid-cols-2 gap-8 overflow-hidden rounded-3xl border border-brand-400/20 bg-ink-800/70 p-8 shadow-[0_0_80px_-20px_rgba(139,92,246,0.35)] backdrop-blur-sm sm:p-12 lg:grid-cols-4">
            <div className="aurora-bg absolute inset-0 opacity-60" aria-hidden="true" />
            {STATS.map((stat, i) => (
              <GsapReveal key={stat.label} delay={i * 0.08} className="relative text-center">
                <dd>
                  <StatCounter
                    value={stat.value}
                    prefix={stat.prefix ?? ""}
                    suffix=""
                    className="font-display text-4xl font-bold text-white sm:text-5xl"
                  />
                  <span className="text-gradient font-display text-4xl font-bold sm:text-5xl">{stat.suffix}</span>
                </dd>
                <dt className="mt-2 text-sm text-slate-400">{stat.label}</dt>
              </GsapReveal>
            ))}
          </dl>
        </GsapReveal>
      </div>
    </section>
  );
}
