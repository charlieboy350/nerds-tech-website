import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/home/Services";
import AiIntegration from "@/components/home/AiIntegration";
import Stats from "@/components/home/Stats";
import Work from "@/components/home/Work";
import Process from "@/components/home/Process";
import Testimonials from "@/components/home/Testimonials";
import Pricing from "@/components/home/Pricing";
import Faq from "@/components/home/Faq";
import ContactSection from "@/components/home/ContactSection";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { FAQS } from "@/data/content";
import { SITE } from "@/site";

export const metadata: Metadata = {
  // `absolute` bypasses the root layout's `%s | ${SITE.name}` template, which would
  // otherwise duplicate the brand suffix on the home page title.
  title: {
    absolute: `${SITE.name} | AI Automation, Web Design & Branding Studio`,
  },
  description:
    "One studio for AI automation, web design & development, branding, SEO, and mobile apps. 11 services, 1 team, zero hand-offs. Get a free consultation today.",
  alternates: { canonical: SITE.url },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <Hero />
      <Marquee />
      <Services limit={6} />
      <AiIntegration />
      <Stats />
      <Work limit={6} />
      <Process />
      <Testimonials />
      <Pricing />
      <Faq />
      <CtaBanner />
      <ContactSection />
    </>
  );
}
