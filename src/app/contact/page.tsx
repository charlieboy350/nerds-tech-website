import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactSection from "@/components/home/ContactSection";
import Faq from "@/components/home/Faq";
import { SITE } from "@/site";

export const metadata: Metadata = {
  title: "Contact — Start Your Project",
  description:
    "Tell us what you're building and get a fixed quote within 24 hours. Email, call, or send the project form — a human always answers.",
  openGraph: {
    title: "Contact — Start Your Project",
    description:
      "Tell us what you're building and get a fixed quote within 24 hours. Email, call, or send the project form — a human always answers.",
  },
  alternates: { canonical: `${SITE.url}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you're building."
        sub="One conversation is all it takes to turn 'someday' into a launch date. Free consultation, fixed quote, zero pressure."
      />
      <div className="-mt-6">
        <ContactSection />
      </div>
      <Faq />
    </>
  );
}
