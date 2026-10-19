"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, Zap, PlayCircle } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { SITE } from "@/site";
import Magnetic from "@/components/gsap/Magnetic";
import Parallax from "@/components/gsap/Parallax";
import ContactButton from "@/components/contact/ContactButton";
import PortfolioBackdrop from "@/components/home/PortfolioBackdrop";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-hero='badge']",
        { autoAlpha: 0, y: 24, scale: 0.94 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.7 },
        0.15
      )
        .fromTo(
          "[data-hero='line']",
          { yPercent: 110 },
          { yPercent: 0, duration: 1.05, stagger: 0.12, ease: "power4.out" },
          0.3
        )
        .fromTo(
          "[data-hero='sub']",
          { autoAlpha: 0, y: 26 },
          { autoAlpha: 1, y: 0, duration: 0.9 },
          0.75
        )
        .fromTo(
          "[data-hero='cta']",
          { autoAlpha: 0, y: 26, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1 },
          0.9
        )
        .fromTo(
          "[data-hero='stat']",
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.09 },
          1.05
        )
        .fromTo(
          "[data-hero='more']",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.8 },
          1.25
        );


    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden pt-72 pb-72 sm:pt-80 sm:pb-80" aria-label="Introduction">
      {/* Clean backdrop — subtle, flat */}
      <div className="aurora-bg absolute inset-0" aria-hidden="true" />
      {/* Blurred 3D portfolio carousel behind the headline */}
      <PortfolioBackdrop />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div data-hero="badge" className="flex justify-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-300">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-400" />
            </span>
            {SITE.tagline}
          </span>
        </div>

        <h1 className="mx-auto mt-8 max-w-5xl text-center font-display text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
          <span className="block overflow-hidden pb-1">
            <span data-hero="line" className="block">Put your business on autopilot.</span>
          </span>
          <span className="block overflow-hidden pb-3">
            <span data-hero="line" className="block text-brand-400">Make your brand impossible to ignore.</span>
          </span>
        </h1>

        <p data-hero="sub" className="mx-auto mt-7 max-w-2xl text-center text-base leading-relaxed text-slate-400 sm:text-lg">
          {SITE.name} blends AI automation, standout design, and clean engineering into one
          connected studio. One team takes you from first sketch to launched product,
          and keeps it growing long after.
        </p>

        <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div data-hero="cta">
            <Magnetic>
              <ContactButton
                className="group inline-flex whitespace-nowrap w-full items-center justify-center gap-2 rounded-full btn-gradient px-9 py-4 text-base font-semibold text-white transition-transform hover:scale-[1.04] active:scale-[0.98] sm:w-auto"
              >
                Start your project
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </ContactButton>
            </Magnetic>
          </div>
          <div data-hero="cta">
            <Magnetic>
              <Link
                href="/work"
                className="group inline-flex whitespace-nowrap w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-9 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-brand-400/50 hover:bg-brand-500/10 hover:shadow-lg active:scale-[0.98] sm:w-auto"
              >
                <PlayCircle className="size-5 text-brand-400 transition-transform duration-300 group-hover:scale-110" />
                View case studies
              </Link>
            </Magnetic>
          </div>
        </div>

        <Parallax speed={-8}>
          <dl className="mx-auto mt-16 flex max-w-lg items-center justify-center gap-10 text-center sm:gap-14">
            {[
              ["11", "services"],
              ["1", "team"],
              ["0", "hand-offs"],
            ].map(([value, label]) => (
              <div key={label} data-hero="stat" className="flex flex-col items-center">
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-4xl font-bold text-white sm:text-5xl ">{value}</dd>
                <dd className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-500">{label}</dd>
              </div>
            ))}
          </dl>
        </Parallax>

        <div data-hero="more" className="mt-12 flex justify-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-brand-300"
          >
            Explore all services
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950 to-transparent" aria-hidden="true" />
    </section>
  );
}
