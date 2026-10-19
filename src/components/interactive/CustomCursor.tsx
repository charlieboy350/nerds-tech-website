"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor: a small dot that snaps to the pointer plus a trailing
 * ring that eases behind it. The ring expands over links and buttons.
 * Desktop fine-pointers only; hidden for touch / reduced motion.
 * The native cursor is hidden via CSS on (pointer: fine) devices.
 */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      d.style.transform = `translate(${mx}px, ${my}px)`;
      const t = (e.target as HTMLElement).closest("a, button, [role='button']");
      const hov = !!t;
      if (hov !== hovering) {
        hovering = hov;
        r.style.width = hov ? "52px" : "32px";
        r.style.height = hov ? "52px" : "32px";
        r.style.borderColor = hov ? "rgba(64,192,224,0.9)" : "rgba(64,192,224,0.45)";
        r.style.background = hov ? "rgba(64,192,224,0.08)" : "transparent";
      }
      if (!raf) tick();
    };
    const tick = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      r.style.transform = `translate(${rx}px, ${ry}px)`;
      if (Math.abs(mx - rx) > 0.4 || Math.abs(my - ry) > 0.4) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };
    const onLeave = () => {
      d.style.opacity = "0";
      r.style.opacity = "0";
    };
    const onEnter = () => {
      d.style.opacity = "1";
      r.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden opacity-0 [@media(pointer:fine)]:block"
        style={{ width: 6, height: 6, marginLeft: -3, marginTop: -3 }}
      >
        <div className="h-full w-full rounded-full bg-brand-400 shadow-[0_0_12px_2px_rgba(64,192,224,0.8)]" />
      </div>
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden opacity-0 transition-[width,height,border-color,background] duration-200 [@media(pointer:fine)]:block"
        style={{
          width: 32,
          height: 32,
          marginLeft: -16,
          marginTop: -16,
          border: "1.5px solid rgba(64,192,224,0.45)",
          borderRadius: 9999,
        }}
      />
    </>
  );
}
