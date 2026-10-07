"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";

export default function Testimonials() {
  return (
    <section className="relative py-20 sm:py-28" aria-label="Client testimonials">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Client words"
          title="Don't take our word for it."
          sub="We're measured on outcomes, not deliverables. Here's what clients say after the dust settles."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure
              key={t.name}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="card-glow flex flex-col rounded-2xl border border-white/10 bg-ink-800/60 p-7"
            >
              <Quote className="size-8 text-volt-500/60" aria-hidden="true" />
              <div className="mt-3 flex gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-300">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4">
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-sm text-slate-500">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
