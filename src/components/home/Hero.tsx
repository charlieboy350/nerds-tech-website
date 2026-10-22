"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { SITE } from "@/site";
import ContactButton from "@/components/contact/ContactButton";
import SplitWords from "@/components/SplitWords";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero]",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, delay: 0.35, ease: "power3.out" }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-black pt-36 pb-20 sm:pt-44 sm:pb-28" aria-label="Introduction">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <p data-hero className="eyebrow">
          {SITE.tagline}
        </p>

        <h1 className="mt-10 font-display font-black uppercase leading-[0.98] tracking-tight">
          <SplitWords immediate as="span" className="block text-[13.5vw] text-cream sm:text-7xl lg:text-8xl xl:text-[7.5rem]">
            Put your business on autopilot.
          </SplitWords>
          <SplitWords immediate delay={0.25} as="span" className="block text-[13.5vw] text-brand-500 sm:text-7xl lg:text-8xl xl:text-[7.5rem]">
            Make your brand impossible to ignore.
          </SplitWords>
        </h1>

        <p data-hero className="mt-10 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          {SITE.name} blends AI automation, standout design, and clean engineering into one
          connected studio. One team takes you from first sketch to launched product,
          and keeps it growing long after.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <div data-hero>
            <ContactButton className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap bg-cobalt px-10 py-4 text-base font-bold uppercase tracking-wider text-white hover:bg-cream hover:text-black sm:w-auto">
              Start your project
              <ArrowRight className="size-5" />
            </ContactButton>
          </div>
          <div data-hero>
            <Link
              href="/work"
              className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap border border-white/30 px-10 py-4 text-base font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black sm:w-auto"
            >
              View case studies
            </Link>
          </div>
        </div>

        <dl data-hero className="mt-20 flex gap-x-8 border-t border-white/15 pt-10 sm:gap-x-16">
          {[
            ["12", "services"],
            ["1", "team"],
            ["0", "hand-offs"],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="font-display text-4xl font-black text-cream sm:text-6xl">{value}</dd>
              <dd className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 sm:text-xs sm:tracking-[0.24em]">{label}</dd>
            </div>
          ))}
          <div className="ml-auto hidden items-end lg:flex">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-zinc-400 hover:text-white"
            >
              Explore all services
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </dl>
      </div>
    </section>
  );
}
