"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, Sparkles, PlayCircle } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { SITE } from "@/site";
import Magnetic from "@/components/gsap/Magnetic";
import Parallax from "@/components/gsap/Parallax";

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

      // Ambient orb drift
      gsap.to("[data-orb='1']", {
        x: 60, y: -40, duration: 9, yoyo: true, repeat: -1, ease: "sine.inOut",
      });
      gsap.to("[data-orb='2']", {
        x: -50, y: 50, duration: 11, yoyo: true, repeat: -1, ease: "sine.inOut",
      });
      gsap.to("[data-orb='3']", {
        x: 40, y: 30, scale: 1.15, duration: 13, yoyo: true, repeat: -1, ease: "sine.inOut",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28" aria-label="Introduction">
      {/* Backdrop */}
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" aria-hidden="true" />
      <div className="aurora-bg absolute inset-0" aria-hidden="true" />
      <div data-orb="1" className="absolute -top-32 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-brand-500/25 blur-[140px]" aria-hidden="true" />
      <div data-orb="2" className="absolute top-40 -left-32 h-96 w-96 rounded-full bg-steel-500/20 blur-[120px]" aria-hidden="true" />
      <div data-orb="3" className="absolute top-64 -right-24 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div data-hero="badge" className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-300 shadow-[0_0_24px_-6px_rgba(139,92,246,0.5)]">
            <Sparkles className="size-3.5" />
            {SITE.tagline}
          </span>
        </div>

        <h1 className="mx-auto mt-7 max-w-4xl text-center font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
          <span className="block overflow-hidden pb-1">
            <span data-hero="line" className="block">Your business on autopilot.</span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span data-hero="line" className="text-gradient block">Your brand impossible to ignore.</span>
          </span>
        </h1>

        <p data-hero="sub" className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-slate-400 sm:text-lg">
          {SITE.name} blends AI automation, standout design, and clean engineering into one
          connected studio. One team takes you from first sketch to launched product —
          and keeps it growing long after.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div data-hero="cta">
            <Magnetic>
              <Link
                href="/contact"
                className="group inline-flex whitespace-nowrap w-full items-center justify-center gap-2 rounded-full bg-steel-500 btn-gradient px-8 py-4 text-base font-semibold text-white shadow-xl shadow-brand-500/40 transition-transform hover:scale-[1.03] active:scale-[0.98] sm:w-auto"
              >
                Start your project
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
          </div>
          <div data-hero="cta">
            <Magnetic>
              <Link
                href="/work"
                className="group relative inline-flex whitespace-nowrap w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white btn-gradient-white px-8 py-4 text-base font-semibold text-ink-950 shadow-xl shadow-black/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-12px_rgba(255,255,255,0.4)] active:translate-y-0 sm:w-auto before:pointer-events-none before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-full"
              >
                <PlayCircle className="size-5 text-brand-600 transition-transform duration-300 group-hover:scale-110" />
                View case studies
              </Link>
            </Magnetic>
          </div>
        </div>

        <Parallax speed={-8}>
          <dl className="mx-auto mt-14 flex max-w-lg items-center justify-center gap-8 text-center sm:gap-12">
            {[
              ["11", "services"],
              ["1", "team"],
              ["0", "hand-offs"],
            ].map(([value, label]) => (
              <div key={label} data-hero="stat" className="flex flex-col items-center">
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-3xl font-bold text-white sm:text-4xl">{value}</dd>
                <dd className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{label}</dd>
              </div>
            ))}
          </dl>
        </Parallax>

        <div data-hero="more" className="mt-10 flex justify-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-1 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            Explore all services
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
