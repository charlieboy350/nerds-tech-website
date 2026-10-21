"use client";

import { SERVICES } from "@/data/content";

/** Infinite scrolling ticker of service names — solid cobalt band. */
export default function Marquee() {
  const items = [...SERVICES, ...SERVICES];
  return (
    <div className="overflow-hidden bg-cobalt py-4" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {items.map((s, i) => (
          <span key={`${s.slug}-${i}`} className="flex items-center gap-10">
            <span className="font-display text-base font-bold uppercase tracking-[0.2em] text-white">
              {s.title}
            </span>
            <span className="size-2 bg-white" />
          </span>
        ))}
      </div>
    </div>
  );
}
