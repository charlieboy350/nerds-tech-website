import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import GsapReveal from "@/components/gsap/GsapReveal";
import { SITE } from "@/site";

export const metadata: Metadata = {
  title: "Contact | Start Your Project | NerdsTech",
  description:
    "Get in touch with NerdsTech. Tell us about your project and we'll get back to you within one business day.",
  openGraph: {
    title: "Contact | Start Your Project | NerdsTech",
    description:
      "Get in touch with NerdsTech. Tell us about your project and we'll get back to you within one business day.",
  },
  alternates: { canonical: `${SITE.url}/contact` },
};

const INFO = [
  { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Phone, label: "Phone", value: SITE.phone, href: `tel:${SITE.phone.replace(/[^+\d]/g, "")}` },
  { icon: MapPin, label: "Office", value: SITE.address },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build something worth talking about."
        sub="Tell us where you want to go. We'll map the fastest route and give you a fixed quote, no discovery-call maze."
      />

      <section className="relative py-14 sm:py-20" aria-label="Contact form and details">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          {/* Contact details */}
          <GsapReveal>
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-white">Reach us directly</h2>
              <p className="leading-relaxed text-slate-400">
                Prefer email or a quick call? We reply within one business day, usually faster.
              </p>
              <ul className="space-y-4">
                {INFO.map((item) => (
                  <li
                    key={item.label}
                    className="card-glow flex items-start gap-4 rounded-2xl border border-white/10 bg-ink-800/60 p-5"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-steel-500/20 to-brand-400/10 text-brand-300 ring-1 ring-brand-400/30">
                      <item.icon className="size-5" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {item.label}
                      </span>
                      {item.href ? (
                        <a href={item.href} className="mt-1 block font-medium text-white transition-colors hover:text-brand-300">
                          {item.value}
                        </a>
                      ) : (
                        <span className="mt-1 block font-medium text-white">{item.value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </GsapReveal>

          {/* Form */}
          <GsapReveal delay={0.1}>
            <div className="card-glow rounded-2xl border border-white/10 bg-ink-800/60 p-6 sm:p-8">
              <h2 className="font-display text-2xl font-bold text-white">Start your project</h2>
              <p className="mt-2 text-sm text-slate-400">
                Fill this in and we'll respond within one business day.
              </p>
              <div className="mt-6">
                <ContactForm idPrefix="page" />
              </div>
            </div>
          </GsapReveal>
        </div>
      </section>
    </>
  );
}
