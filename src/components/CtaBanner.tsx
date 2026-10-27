import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlockReveal from "@/components/BlockReveal";
import SplitWords from "@/components/SplitWords";
import Reveal from "@/components/Reveal";
import ContactButton from "@/components/contact/ContactButton";

/** Full-bleed steel-blue block CTA — one solid color, oversized type. */
export default function CtaBanner() {
  return (
    <section aria-label="Call to action">
      <BlockReveal className="bg-cobalt">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32">
          <SplitWords
            as="h2"
            className="max-w-4xl font-display text-4xl font-black uppercase leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Have an idea? Let&rsquo;s ship it.
          </SplitWords>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              One conversation is all it takes to turn &ldquo;someday&rdquo; into a launch date.
              Free consultation, zero pressure, fixed quote.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ContactButton className="inline-flex items-center justify-center gap-2 bg-black px-6 py-4 text-center text-sm font-bold uppercase tracking-wider text-white hover:bg-cream hover:text-black sm:whitespace-nowrap sm:px-10 sm:text-base">
                Book your free consultation
                <ArrowRight className="size-5" />
              </ContactButton>
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2 border border-white/50 px-6 py-4 text-center text-sm font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black sm:whitespace-nowrap sm:px-10 sm:text-base"
              >
                See the work
              </Link>
            </div>
          </Reveal>
        </div>
      </BlockReveal>
    </section>
  );
}
