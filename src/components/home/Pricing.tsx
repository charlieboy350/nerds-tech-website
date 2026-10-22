import { Check } from "lucide-react";
import { PRICING } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import BlockReveal from "@/components/BlockReveal";
import Reveal from "@/components/Reveal";
import ContactButton from "@/components/contact/ContactButton";

/** Pricing — cream block, flat bordered tiers, cobalt featured tier. */
export default function Pricing() {
  return (
    <section aria-label="Pricing">
      <BlockReveal className="bg-cream text-black">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32">
          <SectionHeading
            dark
            eyebrow="Pricing"
            title="Honest pricing, no mystery quotes."
            sub="Starting points, not ceilings. Every project gets a fixed quote before we begin, the number we agree on is the number you pay."
          />

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {PRICING.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.08}>
                <article
                  className={`flex h-full flex-col items-center border-2 p-8 text-center lg:items-stretch lg:text-left ${
                    tier.featured ? "border-cobalt bg-cobalt text-white" : "border-black bg-cream"
                  }`}
                >
                  {tier.featured && (
                    <p className="mb-5 inline-block self-center bg-black px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white lg:self-start">
                      Most popular
                    </p>
                  )}
                  <h3 className="font-display text-xl font-black uppercase tracking-tight">{tier.name}</h3>
                  <p className={`mt-2 text-sm ${tier.featured ? "text-white/80" : "text-zinc-600"}`}>{tier.blurb}</p>
                  <p className="mt-7">
                    <span className="font-display text-5xl font-black">{tier.price}</span>
                    <span className={`ml-2 text-sm ${tier.featured ? "text-white/70" : "text-zinc-500"}`}>{tier.period}</span>
                  </p>
                  <ul className="mt-8 flex flex-1 flex-col items-start space-y-3.5 text-left lg:items-stretch">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm font-medium">
                        <span
                          className={`mt-0.5 grid size-5 shrink-0 place-items-center ${
                            tier.featured ? "bg-white text-cobalt" : "bg-black text-cream"
                          }`}
                        >
                          <Check className="size-3" strokeWidth={3.5} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <ContactButton
                    className={`mt-9 inline-flex items-center justify-center whitespace-nowrap px-6 py-4 text-sm font-bold uppercase tracking-wider ${
                      tier.featured
                        ? "bg-black text-white hover:bg-cream hover:text-black"
                        : "bg-black text-cream hover:bg-cobalt hover:text-white"
                    }`}
                  >
                    {tier.cta}
                  </ContactButton>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Placeholder pricing, final quotes are fixed and tailored to your scope.
            </p>
          </Reveal>
        </div>
      </BlockReveal>
    </section>
  );
}
