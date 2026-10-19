"use client";

import { useEffect, useRef } from "react";

interface MouseGlowProps {
  className?: string;
  /** Diameter of the glow in px */
  size?: number;
  /** Glow color */
  color?: string;
  /** Max opacity */
  opacity?: number;
}

/**
 * A radial light that smoothly follows the cursor within its parent.
 * Gives sections a "flashlight" interactive feel. Desktop pointers only;
 * hidden when the user prefers reduced motion or uses touch.
 */
export default function MouseGlow({
  className = "",
  size = 560,
  color = "16, 185, 129",
  opacity = 0.14,
}: MouseGlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = -9999;
    let ty = -9999;
    let cx = -9999;
    let cy = -9999;

    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (!raf) tick();
    };
    const onLeave = () => {
      tx = -9999;
      ty = -9999;
      if (!raf) tick();
    };
    const tick = () => {
      // Smooth follow with easing
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      const hidden = tx < -5000;
      el.style.opacity = hidden ? "0" : String(opacity);
      el.style.transform = `translate(${cx - size / 2}px, ${cy - size / 2}px)`;
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5 || !hidden) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [size, color, opacity]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 top-0 z-0 transition-opacity duration-500 ${className}`}
      style={{
        width: size,
        height: size,
        opacity: 0,
        background: `radial-gradient(circle, rgba(${color}, ${opacity}) 0%, transparent 65%)`,
        willChange: "transform",
      }}
    />
  );
}
