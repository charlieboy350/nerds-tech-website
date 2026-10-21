import type { Metadata } from "next";
import { HeartHandshake, Zap, Eye, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import SectionHeading from "@/components/SectionHeading";
import GsapReveal from "@/components/gsap/GsapReveal";
import Stats from "@/components/home/Stats";
import CtaBanner from "@/components/CtaBanner";
import { SITE } from "@/site";

export const metadata: Metadata = {
  title: "About | The Studio Behind the Work",
  description:
    "NerdsTech is a full-stack digital studio uniting AI, design, and engineering under one roof. Meet the team philosophy: one team, zero hand-offs, outcomes over deliverables.",
  openGraph: {
    title: "About | The Studio Behind the Work",
    description:
      "NerdsTech is a full-stack digital studio uniting AI, design, and engineering under one roof. Meet the team philosophy: one team, zero hand-offs, outcomes over deliverables.",
  },
  alternates: { canonical: `${SITE.url}/about` },
};

const VALUES = [
  {
    icon: Users,
    title: "One team, zero hand-offs",
    text: "Designers, engineers, and AI specialists sit together, literally and figuratively. Nothing gets lost translating between vendors because there are no vendors.",
  },
  {
    icon: Zap,
    title: "Outcomes over deliverables",
    text: "A beautiful site that doesn't convert is a failure with nice typography. We measure ourselves on calls booked, sales made, and hours saved.",
  },
  {
    icon: Eye,
    title: "Radical transparency",
    text: "Fixed quotes, shared timelines, and honest advice, including telling you when you don't need us. You always know what's happening and why.",
  },
  {
    icon: HeartHandshake,
    title: "Partners, not providers",
    text: "Most clients stay for years across multiple projects. We succeed when you outgrow the thing we built and come back for the next one.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "About", item: `${SITE.url}/about` },
  ],
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <PageHero
        eyebrow="About"
        title="A studio built for how business runs today."
        sub={`${SITE.name} started with a simple frustration: great companies juggling five vendors who never talked to each other. So we put AI, design, and engineering under one roof, and never looked back.`}
      />

      <section className="py-10 sm:py-14" aria-label="Our story">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <GsapReveal>
            <div className="space-y-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
              <p>
                Most agencies sell you a slice: a logo here, a website there, an ad campaign
                somewhere else. Then you become the project manager stitching it all together,
                the most expensive, least qualified person for that job.
              </p>
              <p>
                We built {SITE.name} to be the opposite: a single team that owns the whole
                picture. Our AI specialists automate the busywork, our designers make it
                beautiful, our engineers make it fast, and because we all work together,
                the brand, the site, and the systems actually agree with each other.
              </p>
              <p>
                Today we work with startups finding their footing and established businesses
                modernizing theirs, across retail, fitness, healthcare, real estate, and
                hospitality. Different industries, same promise:{" "}
                <span className="font-semibold text-cream">
                  one team, zero hand-offs, outcomes you can measure.
                </span>
              </p>
            </div>
          </GsapReveal>
        </div>
      </section>

      <Stats />

      <section className="py-20 sm:py-24" aria-label="Our values">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <SectionHeading
            eyebrow="Values"
            title="What we refuse to compromise on."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <GsapReveal key={v.title} delay={i * 0.08}>
                <article className="h-full border-2 border-white/15 bg-ink-800 p-8">
                  <span className="grid size-12 place-items-center bg-cobalt text-white">
                    <v.icon className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-black uppercase tracking-tight text-cream">{v.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-400 sm:text-[15px]">{v.text}</p>
                </article>
              </GsapReveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
