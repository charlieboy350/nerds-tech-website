"use client";

import { SERVICES } from "@/data/content";

/** Infinite scrolling ticker of service names — pure CSS animation. */
export default function Marquee() {
  const items = [...SERVICES, ...SERVICES];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-ink-900/50 py-5" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {items.map((s, i) => (
          <span key={`${s.slug}-${i}`} className="flex items-center gap-10">
            <span className="font-display text-lg font-semibold uppercase tracking-widest text-slate-400">
              {s.title}
            </span>
            <span className="size-1.5 rounded-full bg-steel-500" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
    </div>
  );
}
