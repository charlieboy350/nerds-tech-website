"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { PROJECTS } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function Work({ limit = 6 }: { limit?: number }) {
  const projects = PROJECTS.slice(0, limit);

  return (
    <section className="relative py-20 sm:py-28" aria-label="Selected work">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Recent work"
          title="A few things we've shipped."
          sub="Real projects, real outcomes. Every engagement below combined at least two of our disciplines — that's where the magic happens."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.article
              key={project.slug}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="card-glow group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60"
            >
              {/* Project photo */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.client} — ${project.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/15 to-transparent" aria-hidden="true" />
                <span className="absolute left-5 top-5 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                  {project.category}
                </span>
                <span className="absolute bottom-4 left-5 font-display text-2xl font-bold text-white drop-shadow-lg">
                  {project.client}
                </span>
                <span className="absolute bottom-4 right-5 inline-flex size-9 items-center justify-center rounded-full bg-brand-500/90 text-white opacity-0 transition-all duration-300 group-hover:opacity-100" aria-hidden="true">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold text-white">
                  <Link href={`/work/${project.slug}`} className="transition-colors group-hover:text-brand-300 before:absolute before:inset-0">
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{project.description}</p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-300">
                  <TrendingUp className="size-4" />
                  {project.result}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors group-hover:text-brand-300">
                  Read the case study
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {limit < PROJECTS.length && (
          <Reveal className="mt-10 text-center">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-steel-500/60 hover:bg-steel-500/10"
            >
              View all case studies <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
