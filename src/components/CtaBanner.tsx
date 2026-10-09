"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import GsapReveal from "@/components/gsap/GsapReveal";
import Magnetic from "@/components/gsap/Magnetic";
import Parallax from "@/components/gsap/Parallax";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function CtaBanner() {
  const glow = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    if (!glow.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.to(glow.current, {
        opacity: 0.9,
        scale: 1.12,
        duration: 5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, glow);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-20 sm:py-24" aria-label="Call to action">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <GsapReveal variant="scale">
          <div className="grain relative overflow-hidden rounded-3xl border border-brand-400/30 bg-ink-800 px-8 py-14 text-center shadow-[0_0_90px_-24px_rgba(139,92,246,0.5)] sm:px-16 sm:py-20">
            <div className="aurora-bg absolute inset-0" aria-hidden="true" />
            <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
            <Parallax speed={14} className="absolute inset-0">
              <div
                ref={glow}
                className="absolute -top-24 left-1/2 h-64 w-[560px] -translate-x-1/2 rounded-full bg-brand-500/30 blur-[100px]"
                aria-hidden="true"
              />
            </Parallax>
            <div className="relative">
              <GsapReveal variant="blur">
                <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
                  Have an idea? <span className="text-gradient">Let&rsquo;s ship it.</span>
                </h2>
              </GsapReveal>
              <GsapReveal delay={0.1}>
                <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
                  One conversation is all it takes to turn &ldquo;someday&rdquo; into a launch date.
                  Free consultation, zero pressure, fixed quote.
                </p>
              </GsapReveal>
              <GsapReveal delay={0.18}>
                <Magnetic>
                  <Link
                    href="/contact"
                    className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-center text-sm font-semibold text-ink-950 shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)] transition-transform hover:scale-[1.03] active:scale-[0.98] sm:w-auto sm:px-8 sm:text-base"
                  >
                    Book your free consultation
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Magnetic>
              </GsapReveal>
            </div>
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
