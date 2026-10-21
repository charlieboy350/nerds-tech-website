import type { ReactNode } from "react";
import Reveal from "./Reveal";
import SplitWords from "./SplitWords";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  align?: "left" | "center";
  /** Set on light (cream) blocks so the sub copy uses a darker grey */
  dark?: boolean;
}

/** Swiss section heading — label, oversized split-word title, sub. */
export default function SectionHeading({ eyebrow, title, sub, align = "left", dark = false }: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <SplitWords
        as="h2"
        className="mt-6 font-display text-4xl font-black uppercase leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl"
      >
        {title}
      </SplitWords>
      {sub && (
        <Reveal delay={0.15}>
          <p className={`mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${dark ? "text-zinc-600" : "text-zinc-400"} ${align === "center" ? "mx-auto" : ""}`}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
