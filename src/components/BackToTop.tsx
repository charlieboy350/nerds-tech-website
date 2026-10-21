"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Back-to-top — square solid button, appears after scrolling. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-[90] grid size-12 place-items-center border border-white/25 bg-black text-cream hover:bg-cobalt hover:text-white"
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
