"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { STATS } from "@/data/content";
import Reveal from "@/components/Reveal";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.textContent = `${prefix}${value}${suffix}`;
      return;
    }
    const obj = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: value,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.n)}${suffix}`;
        },
      });
    }, el);
    return () => ctx.revert();
  }, [value, prefix, suffix]);

  return (
    <span ref={ref} className="font-display text-6xl font-black text-cream sm:text-7xl">
      {prefix}0{suffix}
    </span>
  );
}

/** Stats — black block, oversized numbers, hairline dividers. */
export default function Stats() {
  return (
    <section className="bg-black" aria-label="Studio statistics">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-28">
        <Reveal>
          <dl className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="border-l-2 border-cobalt pl-6 sm:pl-8">
                <dd>
                  <Counter value={stat.value} prefix={stat.prefix ?? ""} suffix={stat.suffix} />
                </dd>
                <dt className="mt-3 text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

