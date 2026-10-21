"use client";

import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Recursively split every string inside a ReactNode into word spans. */
function splitWords(node: ReactNode): ReactNode {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((part, i) => {
      if (part === "" || /^\s+$/.test(part)) return part;
      return (
        <span key={i} data-word="" className="inline-block will-change-transform">
          {part}
        </span>
      );
    });
  }
  if (Array.isArray(node)) {
    return node.map((child, i) => <Fragment key={i}>{splitWords(child)}</Fragment>);
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return cloneElement(node, undefined, splitWords(node.props.children));
  }
  return node;
}

interface SplitWordsProps {
  children: ReactNode;
  className?: string;
  /** Play immediately on mount (hero) instead of on scroll */
  immediate?: boolean;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

/**
 * GSAP word-split text animation — words rise from y: 50 / opacity: 0
 * with a clean stagger (0.1, power3.out), triggered by scroll into
 * view (or on mount when `immediate`).
 */
export default function SplitWords({
  children,
  className,
  immediate = false,
  delay = 0,
  stagger = 0.1,
  as = "span",
}: SplitWordsProps) {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const words = el.querySelectorAll("[data-word]");
    if (!words.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          stagger,
          ease: "power3.out",
          ...(immediate
            ? {}
            : { scrollTrigger: { trigger: el, start: "top 88%", once: true } }),
        }
      );
    }, el);
    return () => ctx.revert();
  }, [immediate, delay, stagger]);

  const Tag = as as "span";
  const parts = Children.toArray(children).map((child) => splitWords(child));
  return (
    <Tag ref={ref} className={className}>
      {parts}
    </Tag>
  );
}
