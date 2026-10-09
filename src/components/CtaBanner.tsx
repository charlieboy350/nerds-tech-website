"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function CtaBanner() {
  return (
    <section className="relative py-20 sm:py-24" aria-label="Call to action">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-steel-500/30 bg-gradient-to-br from-steel-500/20 via-ink-800 to-ink-900 px-8 py-14 text-center sm:px-16 sm:py-20">
            <div className="bg-grid absolute inset-0 opacity-50" aria-hidden="true" />
            <motion.div
              className="absolute -top-24 left-1/2 h-64 w-[560px] -translate-x-1/2 rounded-full bg-steel-500/25 blur-[100px]"
              aria-hidden="true"
              animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Have an idea? <span className="text-gradient">Let’s ship it.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
                One conversation is all it takes to turn “someday” into a launch date.
                Free consultation, zero pressure, fixed quote.
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex whitespace-nowrap items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-ink-950 transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                Book your free consultation
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
