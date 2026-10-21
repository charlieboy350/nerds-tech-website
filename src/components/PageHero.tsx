import SplitWords from "@/components/SplitWords";
import Reveal from "@/components/Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  sub?: string;
}

/** Inner-page hero — pure black, oversized split-word title. */
export default function PageHero({ eyebrow, title, sub }: PageHeroProps) {
  return (
    <section className="bg-black pt-36 pb-20 sm:pt-44 sm:pb-28" aria-label="Page introduction">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <SplitWords
          as="h1"
          className="mt-8 max-w-5xl font-display text-5xl font-black uppercase leading-[1.0] tracking-tight text-cream sm:text-6xl lg:text-7xl"
        >
          {title}
        </SplitWords>
        {sub && (
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">{sub}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
