import Link from "next/link";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { SERVICES, PROJECTS } from "@/data/content";
import SectionHeading from "@/components/SectionHeading";
import BlockReveal from "@/components/BlockReveal";
import Reveal from "@/components/Reveal";

/**
 * Services — cream block, Swiss index list. Each row inverts to black
 * on hover (instant swap, no shadow, no gradient).
 */
export default function Services({ limit }: { limit?: number }) {
  const list = limit ? SERVICES.slice(0, limit) : SERVICES;

  return (
    <section aria-label="Services">
      <BlockReveal className="bg-cream text-black">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32">
          <SectionHeading
            dark
            eyebrow="What we build"
            title="Twelve disciplines. One connected team."
            sub="Every service works on its own, or together as one connected build. Pick what you need today; add the rest when you're ready."
          />

          <div className="mt-16 border-t-2 border-black">
            {list.map((service, i) => {
              const project = PROJECTS.find((p) => p.slug === service.relatedProject);
              const Icon = service.icon;
              return (
                <Reveal key={service.slug} y={30}>
                  <Link
                    href={`/services/${service.slug}`}
                    id={service.slug}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b-2 border-black px-2 py-7 hover:bg-black hover:text-cream sm:gap-8 sm:px-4 sm:py-9"
                  >
                    <span className="font-display text-sm font-black tracking-widest text-brand-600 group-hover:text-brand-400 sm:text-base">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="flex items-center gap-3 font-display text-2xl font-black uppercase leading-none tracking-tight sm:text-4xl">
                        {service.title}
                        <Icon className="hidden size-7 shrink-0 sm:block" aria-hidden="true" />
                      </span>
                      <span className="mt-3 block max-w-2xl text-sm leading-relaxed text-zinc-600 group-hover:text-zinc-300 sm:text-base">
                        {service.short}
                      </span>
                      {project && (
                        <span className="mt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 group-hover:text-zinc-300">
                          <TrendingUp className="size-3.5" />
                          {project.client}: {project.result}
                        </span>
                      )}
                    </span>
                    <ArrowUpRight className="size-7 shrink-0 sm:size-9" aria-hidden="true" />
                  </Link>
                </Reveal>
              );
            })}
          </div>

          {limit && list.length < SERVICES.length && (
            <Reveal className="mt-12">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 whitespace-nowrap bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-cream hover:bg-cobalt hover:text-white"
              >
                View all {SERVICES.length} services <ArrowUpRight className="size-4" />
              </Link>
            </Reveal>
          )}
        </div>
      </BlockReveal>
    </section>
  );
}
