"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { STATS } from "@/data/content";
import Reveal from "@/components/Reveal";

function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const duration = 1600;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className="font-display text-4xl font-bold text-white sm:text-5xl">
      {prefix}
      {display}
      <span className="text-gradient">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative py-16 sm:py-20" aria-label="Studio statistics">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <dl className="grid grid-cols-2 gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 p-8 sm:p-12 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <dd>
                  <Counter value={stat.value} prefix={stat.prefix ?? ""} suffix={stat.suffix} />
                </dd>
                <dt className="mt-2 text-sm text-slate-400">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
