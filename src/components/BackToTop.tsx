"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Floating back-to-top button. Appears after scrolling down,
 * smooth-scrolls to the top on click. Cinematic cyan glow styling.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={goTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-[150] grid size-12 place-items-center rounded-full border border-brand-400/40 bg-ink-800/80 text-brand-300 shadow-[0_0_24px_rgba(16,185,129,0.35)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-brand-400/70 hover:text-white hover:shadow-[0_0_32px_rgba(16,185,129,0.55)] active:scale-95 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
