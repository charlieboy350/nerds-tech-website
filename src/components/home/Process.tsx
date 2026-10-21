import { PROCESS } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import BlockReveal from "@/components/BlockReveal";
import Reveal from "@/components/Reveal";

/** Process — cream block, numbered Swiss rows. */
export default function Process() {
  return (
    <section aria-label="Our process">
      <BlockReveal className="bg-cream text-black">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32">
          <SectionHeading
            dark
            eyebrow="How we work"
            title="From first call to compounding growth."
            sub="A simple, transparent process refined over 120+ launches. You'll always know what's happening, what's next, and what it costs."
          />

          <div className="mt-16 border-t-2 border-black">
            {PROCESS.map((phase) => (
              <Reveal key={phase.step} y={30}>
                <div className="grid gap-3 border-b-2 border-black py-9 sm:grid-cols-[110px_260px_1fr] sm:gap-8">
                  <span className="font-display text-5xl font-black leading-none text-brand-600 sm:text-6xl">
                    {phase.step}
                  </span>
                  <h3 className="font-display text-2xl font-black uppercase tracking-tight">{phase.title}</h3>
                  <p className="max-w-2xl text-base leading-relaxed text-zinc-600">{phase.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </BlockReveal>
    </section>
  );
}
