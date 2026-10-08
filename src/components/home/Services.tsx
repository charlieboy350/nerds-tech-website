"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function Services({ limit }: { limit?: number }) {
  const list = limit ? SERVICES.slice(0, limit) : SERVICES;

  return (
    <section className="relative py-20 sm:py-28" aria-label="Services">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What we build"
          title="Eleven disciplines. One connected team."
          sub="Every service works on its own — or together as one connected build. Pick what you need today; add the rest when you're ready."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {list.map((service) => (
            <motion.article
              key={service.slug}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
              id={service.slug}
              className="card-glow group rounded-2xl border border-white/10 bg-ink-800/60 p-7 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-steel-500/20 to-brand-400/10 text-steel-300 ring-1 ring-steel-500/30 transition-transform duration-300 group-hover:scale-110">
                  <service.icon className="size-6" />
                </span>
                <Link
                  href={`/services#${service.slug}`}
                  aria-label={`Learn more about ${service.title}`}
                  className="grid size-9 place-items-center rounded-full border border-white/10 text-slate-500 opacity-0 transition-all group-hover:opacity-100 hover:border-steel-500/50 hover:text-white"
                >
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">{service.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{service.short}</p>
            </motion.article>
          ))}
        </motion.div>

        {limit && list.length < SERVICES.length && (
          <Reveal className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-steel-500/60 hover:bg-steel-500/10"
            >
              View all {SERVICES.length} services <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
