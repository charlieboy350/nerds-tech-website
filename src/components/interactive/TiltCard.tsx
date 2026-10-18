"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees */
  max?: number;
  /** Scale on hover */
  scale?: number;
}

/**
 * 3D tilt-on-hover wrapper. The card rotates toward the cursor with
 * perspective, plus a specular highlight that tracks the pointer.
 * Desktop pointers only; no-op on touch / reduced motion.
 */
export default function TiltCard({ children, className = "", max = 7, scale = 1.02 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
    if (glow.current) {
      glow.current.style.opacity = "1";
      glow.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(0,194,255,0.16), transparent 60%)`;
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    if (glow.current) glow.current.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${className}`}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.25s ease-out", willChange: "transform" }}
    >
      <div
        ref={glow}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300"
      />
      {children}
    </div>
  );
}
