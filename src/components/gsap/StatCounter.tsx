"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface StatCounterProps {
  /** Final numeric value */
  value: number;
  /** Suffix rendered after the number, e.g. "+", "%", " hrs" */
  suffix?: string;
  /** Prefix rendered before the number */
  prefix?: string;
  decimals?: number;
  className?: string;
}

/** Animated number counter that counts up when scrolled into view. */
export default function StatCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
      return;
    }
    const obj = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: value,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${obj.n.toFixed(decimals)}${suffix}`;
        },
      });
    }, el);
    return () => ctx.revert();
  }, [value, suffix, prefix, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
