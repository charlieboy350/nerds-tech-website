import { Mail, Phone, MapPin } from "lucide-react";
import { SITE } from "@/site";
import SectionHeading from "@/components/SectionHeading";
import BlockReveal from "@/components/BlockReveal";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/contact/ContactForm";

/** Contact — cream block, flat form, solid info column. */
export default function ContactSection() {
  return (
    <section aria-label="Contact">
      <BlockReveal className="bg-cream text-black">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32">
          <SectionHeading
            dark
            eyebrow="Contact"
            title="Let's connect the dots."
            sub="Tell us what you're building, we'll tell you how fast we can ship it. Replies within 24 hours, usually much faster."
          />

          <div className="mt-16 grid gap-10 lg:grid-cols-5">
            <Reveal className="lg:col-span-2">
              <div className="flex h-full flex-col border-2 border-black p-8">
                <h3 className="font-display text-xl font-black uppercase tracking-tight">Get in touch directly</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  Prefer email or a quick call? We&rsquo;re easy to reach, and a human always answers.
                </p>
                <ul className="mt-8 space-y-6">
                  <li className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center bg-black text-cream">
                      <Mail className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-wider text-zinc-500">Email</span>
                      <a href={`mailto:${SITE.email}`} className="mt-1 block break-all font-semibold hover:text-brand-600">{SITE.email}</a>
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center bg-black text-cream">
                      <Phone className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-wider text-zinc-500">Phone</span>
                      <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="mt-1 block font-semibold hover:text-brand-600">{SITE.phone}</a>
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center bg-black text-cream">
                      <MapPin className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-wider text-zinc-500">Location</span>
                      <span className="mt-1 block font-semibold">{SITE.address}</span>
                    </span>
                  </li>
                </ul>
                <div className="mt-auto pt-10">
                  <div className="bg-cobalt p-5 text-white">
                    <p className="text-sm font-bold uppercase tracking-wider">Average reply time: under 24 hours</p>
                    <p className="mt-1 text-xs text-white/80">No spam, no pushy sales calls. Just a clear plan and a fixed quote.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-3">
              <div className="border-2 border-black bg-cream p-8">
                <ContactForm idPrefix="section" tone="light" />
              </div>
            </Reveal>
          </div>
        </div>
      </BlockReveal>
    </section>
  );
}
