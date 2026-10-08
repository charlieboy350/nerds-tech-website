"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { SERVICES, PROJECTS } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function Services({ limit }: { limit?: number }) {
  const list = limit ? SERVICES.slice(0, limit) : SERVICES;
  // Tap-to-flip for touch devices (hover covers desktop via CSS).
  const [flipped, setFlipped] = useState<string | null>(null);

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
          {list.map((service) => {
            const project = PROJECTS.find((p) => p.slug === service.relatedProject);
            const isFlipped = flipped === service.slug;
            return (
              <motion.article
                key={service.slug}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                }}
                id={service.slug}
                className="group [perspective:1400px]"
              >
                <div
                  className={`flip-inner${isFlipped ? " is-flipped" : ""}`}
                  onClick={() => setFlipped(isFlipped ? null : service.slug)}
                >
                  {/* Front — the service */}
                  <div className="flip-front card-glow h-full rounded-2xl border border-white/10 bg-ink-800/60 p-7 backdrop-blur-sm">
                    <div className="flex items-start justify-between">
                      <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-steel-500/20 to-brand-400/10 text-steel-300 ring-1 ring-steel-500/30 transition-transform duration-300 group-hover:scale-110">
                        <service.icon className="size-6" />
                      </span>
                      <Link
                        href={`/services#${service.slug}`}
                        aria-label={`Learn more about ${service.title}`}
                        onClick={(e) => e.stopPropagation()}
                        className="grid size-9 place-items-center rounded-full border border-white/10 text-slate-500 opacity-0 transition-all group-hover:opacity-100 hover:border-steel-500/50 hover:text-white"
                      >
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-white">{service.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{service.short}</p>
                    <p className="mt-5 hidden text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors group-hover:text-brand-300 sm:block">
                      Hover to flip
                    </p>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:hidden">
                      Tap to flip
                    </p>
                  </div>

                  {/* Back — the case study */}
                  {project && (
                    <Link
                      href={`/work/${project.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Read the ${project.client} case study`}
                      className="flip-back flex flex-col rounded-2xl border border-brand-500/30 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-800 p-7"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-300">
                        See it in action
                      </p>
                      <p className="mt-4 font-display text-2xl font-bold text-white">{project.client}</p>
                      <p className="mt-1 text-sm text-slate-400">{project.title}</p>
                      <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-300">
                        <TrendingUp className="size-4" />
                        {project.result}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-white">
                        Read case study <ArrowUpRight className="size-4" />
                      </span>
                    </Link>
                  )}
                </div>
              </motion.article>
            );
          })}
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
