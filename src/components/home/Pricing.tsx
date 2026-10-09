"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { PRICING } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";

export default function Pricing() {
  return (
    <section className="relative py-20 sm:py-28" aria-label="Pricing">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Honest pricing, no mystery quotes."
          sub="Starting points, not ceilings. Every project gets a fixed quote before we begin — the number we agree on is the number you pay."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="mt-14 grid gap-6 lg:grid-cols-3"
        >
          {PRICING.map((tier) => (
            <motion.article
              key={tier.name}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
              className={`relative flex flex-col rounded-3xl border p-8 ${
                tier.featured
                  ? "border-steel-500/60 bg-gradient-to-b from-steel-500/15 to-ink-800 shadow-2xl shadow-steel-500/20 lg:-my-4 lg:py-12"
                  : "border-white/10 bg-ink-800/60"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-steel-500 bg-gradient-to-r from-steel-500 to-brand-400 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                  <Sparkles className="size-3.5" /> Most popular
                </span>
              )}
              <h3 className="font-display text-xl font-semibold text-white">{tier.name}</h3>
              <p className="mt-1.5 text-sm text-slate-400">{tier.blurb}</p>
              <p className="mt-6">
                <span className="font-display text-4xl font-bold text-white">{tier.price}</span>
                <span className="ml-2 text-sm text-slate-500">{tier.period}</span>
              </p>
              <ul className="mt-7 flex-1 space-y-3.5">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${tier.featured ? "bg-steel-500/25 text-steel-300" : "bg-white/5 text-brand-300"}`}>
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-all ${
                  tier.featured
                    ? "bg-steel-500 bg-gradient-to-r from-steel-500 to-brand-400 text-white shadow-lg shadow-steel-500/30 hover:scale-[1.02]"
                    : "border border-white/15 bg-white/[0.03] text-white backdrop-blur-sm hover:-translate-y-0.5 hover:border-brand-400/50 hover:bg-brand-500/10 hover:shadow-[0_12px_32px_-12px_rgba(69,179,212,0.6)]"
                }`}
              >
                {tier.cta}
              </Link>
            </motion.article>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-xs text-slate-400">
          Placeholder pricing — final quotes are fixed and tailored to your scope.
        </p>
      </div>
    </section>
  );
}
