import { TESTIMONIALS } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

/** Testimonials — black block, oversized quote type, hairline grid. */
export default function Testimonials() {
  return (
    <section className="bg-black" aria-label="Client testimonials">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading
          eyebrow="Client words"
          title="Don't take our word for it."
          sub="We're measured on outcomes, not deliverables. Here's what clients say after the dust settles."
        />

        <div className="mt-16 grid gap-px bg-white/15 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="bg-black">
              <figure className="flex h-full flex-col p-8">
                <span className="font-display text-6xl font-black leading-[0.6] text-brand-500" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote className="mt-6 flex-1 font-display text-xl font-bold leading-snug text-cream">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 border-t border-white/15 pt-5">
                  <p className="font-bold uppercase tracking-wider text-cream">{t.name}</p>
                  <p className="mt-1 text-sm text-zinc-500">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
