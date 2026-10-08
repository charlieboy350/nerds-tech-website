import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Work from "@/components/home/Work";
import Testimonials from "@/components/home/Testimonials";
import CtaBanner from "@/components/CtaBanner";
import { PROJECTS } from "@/data/content";
import { SITE } from "@/site";

export const metadata: Metadata = {
  title: "Our Work — Case Studies & Selected Projects",
  description:
    "Selected NerdsTech projects: web apps, brand identities, mobile apps, SEO turnarounds, and AI automation rollouts — with the results to back them up.",
  openGraph: {
    title: "Our Work — Case Studies & Selected Projects",
    description:
      "Selected NerdsTech projects: web apps, brand identities, mobile apps, SEO turnarounds, and AI automation rollouts — with the results to back them up.",
  },
  alternates: { canonical: `${SITE.url}/work` },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Work we're proud to sign."
        sub="A selection of recent launches across web, brand, mobile, and AI. Every project below shipped on time — and kept performing after."
      />
      <Work limit={PROJECTS.length} filterable tight />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
