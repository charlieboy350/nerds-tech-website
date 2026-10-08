import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  align?: "left" | "center";
}

/** Consistent eyebrow + title + subheading block for every section. */
export default function SectionHeading({ eyebrow, title, sub, align = "center" }: SectionHeadingProps) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <Reveal className={`max-w-2xl ${alignCls}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-steel-400">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
        {title}
      </h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-slate-400">{sub}</p>}
    </Reveal>
  );
}
