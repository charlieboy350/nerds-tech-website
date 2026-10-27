"use client";

import { SERVICES } from "@/data/content";

/** Infinite scrolling ticker of service names — solid cyan band. */
export default function Marquee() {
  const items = [...SERVICES, ...SERVICES];
  return (
    <div className="overflow-hidden bg-logo-cyan py-4" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {items.map((s, i) => (
          <span key={`${s.slug}-${i}`} className="flex items-center gap-10">
            <span className="font-display text-base font-bold uppercase tracking-[0.2em] text-black">
              {s.title}
            </span>
            <span className="size-2 bg-black" />
          </span>
        ))}
      </div>
    </div>
  );
}
