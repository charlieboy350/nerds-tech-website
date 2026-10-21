import Link from "next/link";
import { ArrowRight, SearchCheck, Map, Puzzle, GraduationCap, ShieldCheck } from "lucide-react";
import BlockReveal from "@/components/BlockReveal";
import SplitWords from "@/components/SplitWords";
import Reveal from "@/components/Reveal";
import ContactButton from "@/components/contact/ContactButton";

const STEPS = [
  {
    icon: SearchCheck,
    title: "Audit",
    text: "We map your codebase and score each module for AI value versus risk, so effort goes where it pays.",
  },
  {
    icon: Map,
    title: "Roadmap",
    text: "You approve an ordered plan: highest impact, lowest risk first. No surprises, no open-ended billing.",
  },
  {
    icon: Puzzle,
    title: "Integrate",
    text: "We ship AI into one module at a time, wrapped in tests. Each one stable before the next begins.",
  },
  {
    icon: GraduationCap,
    title: "Handover",
    text: "Docs and training for your team, so you own every line we touched and can extend it yourself.",
  },
];

/** AI integration — full-bleed cobalt block. */
export default function AiIntegration() {
  return (
    <section aria-label="AI codebase integration">
      <BlockReveal className="bg-cobalt text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <p className="eyebrow">AI integration, done carefully</p>
          </Reveal>
          <SplitWords
            as="h2"
            className="mt-6 max-w-4xl font-display text-4xl font-black uppercase leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Already have a product? We&rsquo;ll bring AI to it, one module at a time.
          </SplitWords>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              No rip-and-replace. No six-month rewrite. We study your codebase, find where AI
              actually pays off, and integrate it module by module, each one shipped, tested,
              and stable before the next begins.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-px bg-white/25 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08} className="bg-cobalt">
                <div className="h-full p-7">
                  <div className="flex items-center justify-between">
                    <step.icon className="size-8" aria-hidden="true" />
                    <span className="font-display text-sm font-black tracking-widest text-white/60">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-black uppercase tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <p className="inline-flex items-center gap-2 border border-white/40 px-5 py-3 text-sm font-semibold text-white">
              <ShieldCheck className="size-4" />
              We work in your repo, your stack, your process. Your code stays yours.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ContactButton className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap bg-black px-8 py-4 text-base font-bold uppercase tracking-wider text-white hover:bg-cream hover:text-black sm:w-auto">
                Discuss your codebase
                <ArrowRight className="size-5" />
              </ContactButton>
              <Link
                href="/services#ai-codebase-integration"
                className="inline-flex w-full items-center justify-center whitespace-nowrap border border-white/50 px-8 py-4 text-base font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black sm:w-auto"
              >
                How it works
              </Link>
            </div>
          </Reveal>
        </div>
      </BlockReveal>
    </section>
  );
}
