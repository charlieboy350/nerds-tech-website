"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import GsapReveal from "@/components/gsap/GsapReveal";
import Magnetic from "@/components/gsap/Magnetic";
import Parallax from "@/components/gsap/Parallax";
import ContactButton from "@/components/contact/ContactButton";

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
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900 px-8 py-16 text-center shadow-xl sm:px-16 sm:py-24">
            <div className="aurora-bg absolute inset-0" aria-hidden="true" />
            <div className="bg-grid absolute inset-0 opacity-50" aria-hidden="true" />
            <Parallax speed={14} className="absolute inset-0">
              <div
                ref={glow}
                className="absolute -top-28 left-1/2 h-72 w-[640px] -translate-x-1/2 rounded-full bg-brand-500/40 blur-[110px]"
                aria-hidden="true"
              />
            </Parallax>
            {/* Top light edge */}
            <div className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/70 to-transparent" aria-hidden="true" />
            <div className="relative">
              <GsapReveal variant="blur">
                <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Have an idea? <span className="text-gradient">Let&rsquo;s ship it.</span>
                </h2>
              </GsapReveal>
              <GsapReveal delay={0.1}>
                <p className="mx-auto mt-5 max-w-xl text-base text-slate-400 sm:text-lg">
                  One conversation is all it takes to turn &ldquo;someday&rdquo; into a launch date.
                  Free consultation, zero pressure, fixed quote.
                </p>
              </GsapReveal>
              <GsapReveal delay={0.18}>
                <Magnetic>
                  <ContactButton
                    className="group mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full btn-gradient px-10 py-5 text-center text-base font-semibold text-white transition-transform hover:scale-[1.04] active:scale-[0.98] sm:w-auto"
                  >
                    Book your free consultation
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                  </ContactButton>
                </Magnetic>
              </GsapReveal>
            </div>
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
