"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

export interface HoverFaqEntry {
  q: string;
  a: string;
}

function FaqItem({
  q,
  a,
  open,
  onToggle,
  index,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div className={`border-b-2 ${open ? "border-cobalt" : "border-white/15"}`}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`hover-faq-panel-${index}`}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-base font-black uppercase tracking-tight text-cream sm:text-lg">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className={`grid size-8 shrink-0 place-items-center ${open ? "bg-cobalt text-white" : "bg-white/10 text-zinc-300"}`}
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
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="max-w-3xl pb-6 text-sm leading-relaxed text-zinc-400 sm:text-base">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** FAQ list — click to expand. (Name kept for existing imports.) */
export default function HoverFaq({ faqs }: { faqs: HoverFaqEntry[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <div className="border-t-2 border-white/15">
      {faqs.map((faq, i) => (
        <FaqItem
          key={faq.q}
          index={i}
          q={faq.q}
          a={faq.a}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}
