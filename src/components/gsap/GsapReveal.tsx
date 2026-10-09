"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface GsapRevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  /** Visual style of the entrance */
  variant?: "up" | "scale" | "left" | "right" | "blur";
  as?: "div" | "span" | "li";
}

/**
 * GSAP scroll reveal — drop-in replacement for the framer-motion Reveal.
 * Fades/slides content in the first time it scrolls into view.
 */
export default function GsapReveal({
  children,
  delay = 0,
  y = 40,
  className,
  once = true,
  variant = "up",
  as = "div",
}: GsapRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const from: Record<string, number | string> = { autoAlpha: 0 };
    const to: Record<string, number | string> = {
      autoAlpha: 1,
      duration: 1,
      delay,
      ease: "power3.out",
    };
    switch (variant) {
      case "up":
        from.y = y;
        to.y = 0;
        break;
      case "scale":
        from.scale = 0.92;
        to.scale = 1;
        from.y = y * 0.5;
        to.y = 0;
        break;
      case "left":
        from.x = -48;
        to.x = 0;
        break;
      case "right":
        from.x = 48;
        to.x = 0;
        break;
      case "blur":
        from.filter = "blur(12px)";
        to.filter = "blur(0px)";
        from.y = y * 0.6;
        to.y = 0;
        break;
    }

    const ctx = gsap.context(() => {
      gsap.set(el, from);
      gsap.to(el, {
        ...to,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once,
        },
      });
    }, el);
    return () => ctx.revert();
  }, [delay, y, once, variant]);

  const Tag = as as "div";
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
