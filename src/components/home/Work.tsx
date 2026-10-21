"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { PROJECTS } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

export default function Work({ limit = 6, filterable = false, tight = false }: { limit?: number; filterable?: boolean; tight?: boolean }) {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);
  const projects = filtered.slice(0, limit);
  const countFor = (cat: string) => (cat === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat).length);

  return (
    <section className={`bg-black ${tight ? "pt-10 pb-24 sm:pt-14 sm:pb-32" : "py-24 sm:py-32"}`} aria-label="Selected work">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Recent work"
          title="A few things we've shipped."
          sub="Real projects, real outcomes. Every engagement below combined at least two of our disciplines, that's where the magic happens."
        />

        {filterable && (
          <Reveal className="mt-10">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
              {CATEGORIES.map((cat) => {
                const isActive = active === cat;
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(cat)}
                    className={`whitespace-nowrap border px-5 py-2.5 text-sm font-bold uppercase tracking-wider ${
                      isActive
                        ? "border-cobalt bg-cobalt text-white"
                        : "border-white/25 text-zinc-400 hover:bg-white hover:text-black"
                    }`}
                  >
                    {cat}
                    <span className={`ml-2 text-xs ${isActive ? "text-white/70" : "text-zinc-500"}`}>
                      {countFor(cat)}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        )}

        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.1}>
              <article className="group relative">
                <div className="relative h-64 overflow-hidden bg-ink-800 sm:h-80">
                  <Image
                    src={project.image}
                    alt={`${project.client} | ${project.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <span className="absolute left-0 top-0 bg-cobalt px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                    {project.category}
                  </span>
                </div>
                <div className="border-b-2 border-white/15 pb-8 pt-6 group-hover:border-cobalt">
                  <p className="font-display text-sm font-black uppercase tracking-[0.2em] text-zinc-500">{project.client}</p>
                  <h3 className="mt-2 font-display text-2xl font-black uppercase leading-tight tracking-tight text-cream sm:text-3xl">
                    <Link href={`/work/${project.slug}`} className="before:absolute before:inset-0 hover:text-brand-400">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">{project.description}</p>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-400">
                    <TrendingUp className="size-4" />
                    {project.result}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {limit < PROJECTS.length && (
          <Reveal className="mt-14">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 whitespace-nowrap bg-cream px-8 py-4 text-sm font-bold uppercase tracking-wider text-black hover:bg-cobalt hover:text-white"
            >
              View all case studies <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
