"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

export interface HoverFaqEntry {
  q: string;
  a: string;
}

function HoverFaqItem({
  q,
  a,
  open,
  onToggle,
  onHover,
  index,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  onHover: (hovering: boolean) => void;
  index: number;
}) {
  return (
    <div
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
        open
          ? "border-brand-400/40 bg-ink-800"
          : "border-white/10 bg-ink-800/50 hover:border-white/25"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`hover-faq-panel-${index}`}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base font-semibold text-white">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className={`grid size-8 shrink-0 place-items-center rounded-full transition-colors ${
            open ? "bg-brand-500 text-white" : "bg-white/5 text-slate-400"
          }`}
        >
          <Plus className="size-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`hover-faq-panel-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-slate-400">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * FAQ list where hovering a card expands its answer downward (desktop).
 * Touch devices keep tap-to-toggle.
 */
export default function HoverFaq({ faqs }: { faqs: HoverFaqEntry[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const canHover =
    typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

  if (faqs.length === 0) return null;

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <HoverFaqItem
          key={faq.q}
          index={i}
          q={faq.q}
          a={faq.a}
          open={openIndex === i || hoverIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          onHover={(hovering) =>
            setHoverIndex(canHover ? (hovering ? i : null) : null)
          }
        />
      ))}
    </div>
  );
}
